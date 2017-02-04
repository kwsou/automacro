import React from 'react';
import {
    View,
    Label,
    Radio
} from 'react-desktop/windows';
import { default as ViewContent } from '../common/ViewContent';
import { default as InputEntry } from '../common/InputEntry';

class MainSettings extends React.Component {
    static defaultProps = {
        theme: 'light'
    }
    
    render() {
        const { theme, color } = this.props;
        
        return (
            <ViewContent>
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
            </ViewContent>
        );
    }
}

export default MainSettings;
