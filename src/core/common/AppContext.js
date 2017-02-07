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

        // merge settings
        this.app = {
            NAME: 'Automacro',
            ROOT_PATH: rootPath,
            CONFIG_PATH: path.join(rootPath, CONFIG_FILE_NAME)
        };
        
        this.ui = {
            theme: this._setValue(config.settings.main.theme, 'light'),
            primaryColour: '#87FF00',
            secondaryColour: '#FF0087',
            teritaryColour: '#0087FF',
            textColour: '#000000'
        };
        
        this.env = {
            NODE_ENV: NODE_ENV,
            IS_DEV_MODE: NODE_ENV == 'development' || process.execPath.match(/[\\/]electron/).length > 0
        };
        
        // re-calculate some settings from the merge
        switch(this.ui.theme) {
            case 'dark':
                this.ui.textColour = '#FFFFFF';
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
                    theme: this.ui.theme
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
