import { ipcRenderer } from 'electron';
import React from 'react';
import {
    View,
    Label,
    Radio
} from 'react-desktop/windows';

import fs from 'fs-sync';

let AppContext          = REQUIRE_LOCAL('core/common/AppContext');
let CommonComponents    = REQUIRE_LOCAL('views/components/common');

const themes = [
    { label: 'Light', value: 'light' },
    { label: 'Dark', value: 'dark' }
];

class MainSettings extends React.Component {
    onThemeChange(evt) {
        ipcRenderer.send('themeChange', {
            theme: evt.target.value
        });
    }
    
    render() {
        return (
            <CommonComponents.ContentView>
                <CommonComponents.InputEntry title="Theme" desc="Select a GUI colour theme." layout="horizontal">
                    {themes.map(theme => (
                        <CommonComponents.InputContainer key={"radio_theme_" + theme.value}>
                            <Radio
                                label={theme.label}
                                name="radio_theme"
                                onChange={this.onThemeChange}
                                defaultValue={theme.value}
                                defaultChecked={AppContext.ui.THEME == theme.value}
                            />
                        </CommonComponents.InputContainer>
                    ))}
                </CommonComponents.InputEntry>
            </CommonComponents.ContentView>
        );
    }
}

export default MainSettings;
