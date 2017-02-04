import React from 'react';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';
import { default as ViewContent } from '../common/ViewContent';
import { default as InputEntry } from '../common/InputEntry';

class NotificationSettings extends React.Component {
    static defaultProps = {
        theme: 'light'
    }
    
    render() {
        const { theme, color } = this.props;
        
        return (
            <ViewContent>
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
            </ViewContent>
        );
    }
}

export default NotificationSettings;
