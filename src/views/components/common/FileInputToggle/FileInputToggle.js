import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { View, Checkbox } from 'react-desktop/windows';

import styles from './styles/css';
let AppContext          = REQUIRE_LOCAL('core/common/AppContext');
let CommonComponents    = REQUIRE_LOCAL('views/components/common');
let cssTransitionStyle  = REQUIRE_LOCAL('views/override/ReactCSSTransitionGroup/css');

// common file input element with a checkbox parent that enables or disables on toggle
class FileInputToggle extends React.Component {
    static defaultProps = {
        checkboxOnChange: function(){},
        checkboxDefaultChecked: true
    }
    
    constructor(props) {
        super(props);
        
        this.state = {
            enabled: this.props.checkboxDefaultChecked
        };
    }
    
    checkboxOnChange(evt) {
        this.props.checkboxOnChange();
        this.setState({ enabled: !this.state.enabled });
    }
    
    render() {
        return (
            <View layout="vertical">
                    <Checkbox
                        label={this.props.checkboxLabel}
                        onChange={this.checkboxOnChange.bind(this)}
                        defaultChecked={this.props.checkboxDefaultChecked}
                    />
                    <ReactCSSTransitionGroup style={cssTransitionStyle.container} transitionName="FileInputToggle" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                        {this.state.enabled ?
                            <CommonComponents.FileInput
                                key="file_input"
                                label={this.props.fileInputLabel}
                                placeholder={this.props.fileInputPlaceholder}
                                onChange={this.props.fileInputOnChange}
                                fileFilters={this.props.fileInputFilters}
                                defaultValue={this.props.fileInputDefaultValue}
                            /> : null
                        }
                    </ReactCSSTransitionGroup>
            </View>
        );
    }
}

FileInputToggle.propTypes = {
    // label for the parent toggling checkbox
    checkboxLabel: React.PropTypes.string.isRequired,
    
    // callback function that is invoked when the parent toggling checkbox has been changed. It has the following signature: callback()
    checkboxOnChange: React.PropTypes.func,
    
    // whether or not the parent toggling checkbox is enabled on startup
    checkboxDefaultChecked: React.PropTypes.bool,
    
    // The following are props for the FileInput component:
    fileInputLabel: React.PropTypes.string,
    fileInputPlaceholder: React.PropTypes.string,
    fileInputDefaultValue: React.PropTypes.string,
    fileInputOnChange: React.PropTypes.func,
    fileInputFilters: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default FileInputToggle;
