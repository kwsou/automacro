import React from 'react';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let ContentView     = REQUIRE_LOCAL('views/components/common/ContentView');
let InputEntry      = REQUIRE_LOCAL('views/components/common/InputEntry');

class NotificationSettings extends React.Component {
    render() {
        return (
            <ContentView>
                <InputEntry title="Notifications" desc="When Automacro finishes its job.">
                    <Checkbox
                        label="Enable desktop notifications"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue="I got checked!"
                        defaultChecked
                    />
                </InputEntry>
                
                <InputEntry title="Notification Sounds" desc="Played when Automacro finishes its job.">
                    <Checkbox
                        label="Enable sound notifications"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue="I got checked!"
                        defaultChecked
                    />
                    <TextInput
                        ref="input"
                        label="Sound file to play"
                        placeholder="Select a file"
                        onChange={(e) => console.log(e)}
                    />
                </InputEntry>
            </ContentView>
        );
    }
}

export default NotificationSettings;
