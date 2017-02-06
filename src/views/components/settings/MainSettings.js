import React from 'react';
import {
    View,
    Label,
    Radio
} from 'react-desktop/windows';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let ContentView     = REQUIRE_LOCAL('views/components/common/ContentView');
let InputEntry      = REQUIRE_LOCAL('views/components/common/InputEntry');

class MainSettings extends React.Component {
    render() {        
        return (
            <ContentView>
                <InputEntry title="Theme" desc="Select a GUI colour theme.">
                    <Radio
                        label="Light"
                        name="radio1"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue="Light"
                        defaultChecked
                    />
                    <Radio
                        label="Dark"
                        name="radio1"
                        onChange={(e) => console.log(e.target.value)}
                        defaultValue="Light"
                    />
                </InputEntry>
            </ContentView>
        );
    }
}

export default MainSettings;
