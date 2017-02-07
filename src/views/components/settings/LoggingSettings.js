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
let InputContainer  = REQUIRE_LOCAL('views/components/common/InputContainer');

class LoggingSettings extends React.Component {
    render() {
        return (
            <ContentView>
                <InputEntry title="Logging" desc="Logs various events.">
                    <InputContainer>
                        <Checkbox
                            label="Enable logging"
                            onChange={(e) => console.log(e.target.value)}
                            defaultValue="I got checked!"
                            defaultChecked
                        />
                    </InputContainer>
                    <InputContainer>
                        <TextInput
                            ref="input"
                            label="Save logs to"
                            placeholder="Select a file destination"
                            onChange={(e) => console.log(e)}
                        />
                    </InputContainer>
                </InputEntry>
            </ContentView>
        );
    }
}

export default LoggingSettings;
