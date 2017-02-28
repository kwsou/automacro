import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
    View,
    Label,
    Checkbox,
    TextInput
} from 'react-desktop/windows';

let AppContext          = REQUIRE_LOCAL('core/common/AppContext');
let CommonComponents    = REQUIRE_LOCAL('views/components/common');
let cssTransitionStyle  = REQUIRE_LOCAL('views/override/ReactCSSTransitionGroup/css');

class LoggingSettings extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            enabled: AppContext.logging.ENABLE_LOGGING
        };
    }
    
    onEnableLogging() {
        AppContext.logging.ENABLE_LOGGING = !AppContext.logging.ENABLE_LOGGING;
        AppContext.exportConfig();
        
        this.setState({ enabled: !this.state.enabled });
    }
    
    onUseSingleLogFile() {
        AppContext.logging.USE_SINGLE_LOG_FILE = !AppContext.logging.USE_SINGLE_LOG_FILE;
        AppContext.exportConfig();
    }
    
    onSingleLogFileSelect(payload) {
        if(fs.exists(payload.newFile)) {
            AppContext.logging.SINGLE_LOG_FILE = payload.newFile;
            payload.commit();
        } else {
            electron.remote.dialog.showErrorBox('Invalid file specified', 'The selected log file does not exist!');
        }
    }
    
    render() {
        return (
            <CommonComponents.ContentView>
                <CommonComponents.InputEntry title="Logging" desc="Capture events into a log file.">
                    <CommonComponents.InputContainer>
                        <Checkbox
                            label="Enable logging"
                            onChange={this.onEnableLogging.bind(this)}
                            defaultChecked={AppContext.logging.ENABLE_LOGGING}
                        />
                    </CommonComponents.InputContainer>
                </CommonComponents.InputEntry>
                
                <ReactCSSTransitionGroup style={cssTransitionStyle.container} transitionName="OptionToggle" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                    {this.state.enabled ?
                        <CommonComponents.InputEntry title="Use Single Log File" desc="All logs output to a single file. If disabled, daily logs will automatically be created under the logging folder.">
                            <CommonComponents.InputContainer>
                                <CommonComponents.FileInputToggle
                                    checkboxLabel="Merge all log output"
                                    checkboxOnChange={this.onUseSingleLogFile}
                                    checkboxDefaultChecked={AppContext.logging.USE_SINGLE_LOG_FILE}
                                    fileInputLabel="Select intended log file"
                                    fileInputPlaceholder="Choose a log file"
                                    fileInputOnChange={this.onSingleLogFileSelect}
                                    fileInputFilters={[ { name: 'Log File', extensions: [ 'log' ] } ]}
                                    fileInputDefaultValue={AppContext.logging.SINGLE_LOG_FILE}
                                />
                            </CommonComponents.InputContainer>
                        </CommonComponents.InputEntry> : null
                    }
                </ReactCSSTransitionGroup>
                
            </CommonComponents.ContentView>
        );
    }
}

export default LoggingSettings;
