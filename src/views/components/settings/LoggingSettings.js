import React from 'react';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';

let AppContext          = REQUIRE_LOCAL('core/common/AppContext');
let CommonComponents    = REQUIRE_LOCAL('views/components/common');

class LoggingSettings extends React.Component {
    render() {
        return (
            <CommonComponents.ContentView>
                <CommonComponents.InputEntry title="Logging" desc="Logs various events.">
                    <CommonComponents.InputContainer>
                        <Checkbox
                            label="Enable logging"
                            onChange={(e) => console.log(e.target.value)}
                            defaultValue="I got checked!"
                            defaultChecked
                        />
                    </CommonComponents.InputContainer>
                    <CommonComponents.InputContainer>
                        <TextInput
                            ref="input"
                            label="Save logs to"
                            placeholder="Select a file destination"
                            onChange={(e) => console.log(e)}
                        />
                    </CommonComponents.InputContainer>
                </CommonComponents.InputEntry>
            </CommonComponents.ContentView>
        );
    }
}

export default LoggingSettings;
