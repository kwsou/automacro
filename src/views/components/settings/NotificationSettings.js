import electron from 'electron';
import React from 'react';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';

import fs from 'fs-sync';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let ContentView     = REQUIRE_LOCAL('views/components/common/ContentView');
let InputEntry      = REQUIRE_LOCAL('views/components/common/InputEntry');
let InputContainer  = REQUIRE_LOCAL('views/components/common/InputContainer');
let FileInputToggle = REQUIRE_LOCAL('views/components/common/FileInputToggle');

class NotificationSettings extends React.Component {
    onDesktopNotification() {
        AppContext.notifications.ENABLE_DESKTOP_NOTIFICATION = !AppContext.notifications.ENABLE_DESKTOP_NOTIFICATION;
        AppContext.exportConfig();
    }
    
    onSoundNotification() {
        AppContext.notifications.ENABLE_SOUND_NOTFICIATION = !AppContext.notifications.ENABLE_SOUND_NOTFICIATION;
        AppContext.exportConfig();
    }
    
    onSoundFileSelect(payload) {
        if(fs.exists(payload.newFile)) {
            AppContext.notifications.SOUND_NOTIFICATION_FILE = payload.newFile;
            payload.commit();
        } else {
            electron.remote.dialog.showErrorBox('Invalid file specified', 'The selected sound file does not exist!');
        }
    }
    
    render() {
        return (
            <ContentView>
                <InputEntry title="Notifications" desc="When Automacro finishes its job.">
                    <InputContainer>
                        <Checkbox
                            label="Enable desktop notifications"
                            onChange={this.onDesktopNotification}
                            defaultChecked={AppContext.notifications.ENABLE_DESKTOP_NOTIFICATION}
                        />
                    </InputContainer>
                </InputEntry>
                
                <InputEntry title="Notification Sounds" desc="Played when Automacro finishes its job.">
                    <InputContainer>
                        <FileInputToggle
                            checkboxLabel="Enable sound notifications"
                            checkboxOnChange={this.onSoundNotification}
                            checkboxDefaultChecked={AppContext.notifications.ENABLE_SOUND_NOTFICIATION}
                            fileInputLabel="Select sound to play"
                            fileInputPlaceholder="Choose a sound file"
                            fileInputOnChange={this.onSoundFileSelect.bind(this)}
                            fileFilters={[ { name: 'Sound', extensions: [ 'mp3' ] } ]}
                            fileInputDefaultValue={AppContext.notifications.SOUND_NOTIFICATION_FILE}
                            fileInputDefaultChecked={AppContext.notifications.ENABLE_SOUND_NOTFICIATION}
                        />
                    </InputContainer>
                </InputEntry>
            </ContentView>
        );
    }
}

export default NotificationSettings;
