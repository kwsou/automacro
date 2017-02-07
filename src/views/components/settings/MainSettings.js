import electron from 'electron';
import React from 'react';
import {
    View,
    Label,
    Radio
} from 'react-desktop/windows';

import fs from 'fs-sync';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let ContentView     = REQUIRE_LOCAL('views/components/common/ContentView');
let InputEntry      = REQUIRE_LOCAL('views/components/common/InputEntry');
let InputContainer  = REQUIRE_LOCAL('views/components/common/InputContainer');

const themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
];

class MainSettings extends React.Component {
    onThemeChange = (evt) => {
        var theme = evt.target.value;
        
        if(theme != AppContext.ui.theme) {
            AppContext.ui.theme = evt.target.value;
            AppContext.exportConfig();
            electron.remote.getCurrentWindow().reload();
        }
    }
    
    render() {
        return (
            <ContentView>
                <InputEntry title="Theme" desc="Select a GUI colour theme." layout="horizontal">
                    {themes.map(theme => (
                        <InputContainer key={"radio_theme_" + theme.value}>
                            <Radio
                                label={theme.label}
                                name="radio_theme"
                                onChange={this.onThemeChange}
                                defaultValue={theme.value}
                                defaultChecked={AppContext.ui.theme == theme.value}
                            />
                        </InputContainer>
                    ))}
                </InputEntry>
            </ContentView>
        );
    }
}

export default MainSettings;
