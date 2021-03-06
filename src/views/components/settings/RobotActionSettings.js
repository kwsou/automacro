import React from 'react';
import {
    View,
    Label,
    Checkbox,
    Radio
} from 'react-desktop/windows';

let AppContext          = REQUIRE_LOCAL('core/common/AppContext');
let CommonComponents    = REQUIRE_LOCAL('views/components/common');

const delayPresets = [
    { label: 'Normal', value: 'normal' },
    { label: 'Extra', value: 'extra' }
];

class RobotActionSettings extends React.Component {
    onWinctlChange = (evt) => {
        AppContext.app.ENABLE_WINCTL = !AppContext.app.ENABLE_WINCTL;
        AppContext.exportConfig();
    }
    
    onPresetChange = (evt) => {
        var preset = evt.target.value;
        
        if(preset != AppContext.app.DELAY_PRESET) {
            AppContext.app.DELAY_PRESET = preset;
            AppContext.exportConfig();
        }
    }
    
    render() {
        return (
            <CommonComponents.ContentView>
                <CommonComponents.InputEntry title="Windows Control" desc="Automatically toggle the active process to the game before every programmed mouse click or key stroke.">
                    <CommonComponents.InputContainer>
                        <Checkbox
                            label="Enable Winctl"
                            onChange={this.onWinctlChange}
                            defaultChecked={AppContext.app.ENABLE_WINCTL}
                        />
                    </CommonComponents.InputContainer>
                </CommonComponents.InputEntry>
                
                <CommonComponents.InputEntry title="Delay Preset" desc="This affects the delay inbetween programmed mouse click and key strokes" layout="horizontal">
                    {delayPresets.map(preset => (
                        <CommonComponents.InputContainer key={"radio_delay_preset_" + preset.value}>
                            <Radio
                                label={preset.label}
                                name="radio_delay_preset"
                                onChange={this.onPresetChange}
                                defaultValue={preset.value}
                                defaultChecked={AppContext.app.DELAY_PRESET == preset.value}
                            />
                        </CommonComponents.InputContainer>
                    ))}
                </CommonComponents.InputEntry>
            </CommonComponents.ContentView>
        );
    }
}

export default RobotActionSettings;
