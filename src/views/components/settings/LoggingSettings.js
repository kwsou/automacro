import React from 'react';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';
import { default as ViewContent } from '../common/ViewContent';
import { default as InputEntry } from '../common/InputEntry';

class LoggingSettings extends React.Component {
    static defaultProps = {
        theme: 'light'
    }
    
    render() {
        const { theme, color } = this.props;
        
        return (
            <ViewContent>
                <InputEntry title="Logging" desc="Logs various events.">
                    <Checkbox
                        label="Enable logging"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue="I got checked!"
                        defaultChecked
                    />
                    <TextInput
                        ref="input"
                        label="Save logs to"
                        placeholder="Select a file destination"
                        onChange={(e) => console.log(e)}
                    />
                </InputEntry>
            </ViewContent>
        );
    }
}

export default LoggingSettings;
