import React from 'react';
import {
    View,
    Label,
    Checkbox,
    Radio
} from 'react-desktop/windows';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let ContentView     = REQUIRE_LOCAL('views/components/common/ContentView');
let InputEntry      = REQUIRE_LOCAL('views/components/common/InputEntry');
let InputContainer  = REQUIRE_LOCAL('views/components/common/InputContainer');

class RobotActionSettings extends React.Component {
    render() {
        return (
            <ContentView>
                <InputEntry title="Windows Control" desc="Automatically toggle the active process to the game before every programmed mouse click or key stroke.">
                    <InputContainer>
                        <Checkbox
                            label="Enable"
                            onChange={(e) => console.log(e.target.value)}
                            defaultValue="I got checked!"
                            defaultChecked
                        />
                    </InputContainer>
                </InputEntry>
                
                <InputEntry title="Delay Preset" desc="This affects the delay inbetween programmed mouse click and key strokes" layout="horizontal">
                    <InputContainer>
                        <Radio
                            label="Normal"
                            name="radio1"
                            onChange={(e) => console.log(e.target.value)}
                            defaultValue="Light"
                            defaultChecked
                        />
                    </InputContainer>
                    <InputContainer>
                        <Radio
                            label="Slight Lag"
                            name="radio1"
                            onChange={(e) => console.log(e.target.value)}
                            defaultValue="Light"
                        />
                    </InputContainer>
                </InputEntry>
            </ContentView>
        );
    }
}

export default RobotActionSettings;
