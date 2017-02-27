import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { View, Checkbox } from 'react-desktop/windows';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let InputContainer  = REQUIRE_LOCAL('views/components/common/InputContainer');
let FileInput       = REQUIRE_LOCAL('views/components/common/FileInput');
let styles          = REQUIRE_LOCAL('views/components/common/FileInputToggleCSS.js');

// common file input element with a checkbox parent that enables or disables on toggle
class ViewContent extends React.Component {
    static defaultProps = {
        checkboxLabel: 'Sample Checkbox Label',
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
                    <ReactCSSTransitionGroup transitionName="FileInputToggle" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                        {this.state.enabled ?
                            <FileInput
                                key="file_input"
                                ref={(child) => { this._fileInput = child; }}
                                label={this.props.fileInputLabel}
                                placeholder={this.props.fileInputPlaceholder}
                                onChange={this.props.fileInputOnChange}
                                fileFilters={this.props.fileFilters}
                                defaultValue={this.props.fileInputDefaultValue}
                                defaultChecked={this.props.fileInputDefaultChecked}
                            /> : null
                        }
                    </ReactCSSTransitionGroup>
            </View>
        );
    }
}

export default ViewContent;
