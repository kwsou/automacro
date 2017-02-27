// contains various global settings to be used throughout in the app
import _ from 'underscore';
import fs from 'fs-sync';
import ini from 'ini';
import path from 'path';

const NODE_ENV = process.env.NODE_ENV || 'development';
const CONFIG_FILE_NAME = 'config.ini';
class AppContext {    
    importConfig = function(rootPath) {
        // if no config file is found, use the default settings
        var config = {};
        try {
            var configFilePath = path.join(rootPath, CONFIG_FILE_NAME);
            if(fs.exists(configFilePath)) {
                config = ini.parse(fs.read(configFilePath));
            }
        } catch(err) {
            console.log('err! ' + err);
        }
        
        // if config is not of the right structure, we fix it before merging config settings
        config.settings = this._emptyObjectIfNonExistant(config.settings);
        config.settings.main = this._emptyObjectIfNonExistant(config.settings.main);
        config.settings.robot_actions = this._emptyObjectIfNonExistant(config.settings.robot_actions);
        config.settings.notifications = this._emptyObjectIfNonExistant(config.settings.notifications);

        // merge settings
        this.app = {
            NAME: 'Automacro',
            ROOT_PATH: rootPath,
            CONFIG_PATH: path.join(rootPath, CONFIG_FILE_NAME),
            ENABLE_WINCTL: this._setValue(config.settings.robot_actions.enableWinctl, true),
            DELAY_PRESET: this._setValue(config.settings.robot_actions.delayPreset, 'normal')
        };
        
        this.notifications = {
            ENABLE_DESKTOP_NOTIFICATION: this._setValue(config.settings.notifications.enableDesktopNotifications, true),
            ENABLE_SOUND_NOTFICIATION: this._setValue(config.settings.notifications.enableSoundNotficiations, true),
            SOUND_NOTIFICATION_FILE: this._setValue(config.settings.notifications.soundNotificationFile, './public/media/tuturu.mp3')
        };
        
        this.ui = {
            THEME: this._setValue(config.settings.main.theme, 'light'),
            PRIMARY_COLOUR: '#87FF00',
            SECONDARY_COLOUR: '#FF0087',
            TERITARY_COLOUR: '#0087FF',
            TEXT_COLOUR: '#000000'
        };
        
        this.env = {
            NODE_ENV: NODE_ENV,
            IS_DEV_MODE: NODE_ENV == 'development' || process.execPath.match(/[\\/]electron/).length > 0
        };
        
        // re-calculate some settings from the merge
        switch(this.ui.THEME) {
            case 'dark':
                this.ui.TEXT_COLOUR = '#FFFFFF';
                break;
            case 'light':
            default:    // fall through
                break;
        }
    }
    
    exportConfig = function() {        
        fs.write(this.app.CONFIG_PATH, ini.stringify({
            settings: {
                main: {
                    theme: this.ui.THEME
                },
                robot_actions: {
                    enableWinctl: this.app.ENABLE_WINCTL,
                    delayPreset: this.app.DELAY_PRESET
                },
                notifications: {
                    enableDesktopNotifications: this.notifications.ENABLE_DESKTOP_NOTIFICATION,
                    enableSoundNotficiations: this.notifications.ENABLE_SOUND_NOTFICIATION,
                    soundNotificationFile: this.notifications.SOUND_NOTIFICATION_FILE
                }
            }
        }));
    }
    
    // sets prop to a specific value if it exists, or uses a default one if not
    _setValue = function(value, defaultValue, additionalPredicate) {
        if(!_.isNull(value) && !_.isUndefined(value)) {
            if(additionalPredicate) {
                if(additionalPredicate(value)) {
                    return value;
                }
            } else {
                return value;
            }
        }
        return defaultValue;
    }
    
    _emptyObjectIfNonExistant = function(value) {
        return this._setValue(value, {}, _.isObject);
    }
}

let appContext = new AppContext();
export default appContext;
