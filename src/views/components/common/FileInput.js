import electron from 'electron';
import React from 'react';
import { TextInput, Button, View } from 'react-desktop/windows';

let AppContext  = REQUIRE_LOCAL('core/common/AppContext');
let Util        = REQUIRE_LOCAL('core/common/Util');
let styles      = REQUIRE_LOCAL('views/components/common/FileInputCSS');

// common file input element containing non-editable text input field and browse button
class ViewContent extends React.Component {
    static defaultProps = {
        label: 'Sample Input Label',
        placeholder: 'Sample placeholder',
        defaultValue: '',
        buttonLabel: 'Browse...',
        onChange: function(payload) { payload.commit(); },
        fileFilters: [
            { name: 'All Files', extensions: ['*'] }
        ]
    }
    
    constructor(props) {
        super(props);
        this._currentFile = this.props.defaultValue;
    }
    
    onButtonClick() {
        // prompt user to select file
        var promptForFiles = electron.remote.dialog.showOpenDialog({ properties: [ 'openFile' ], filters: this.props.fileFilters });
        
        if(promptForFiles && promptForFiles.length > 0) {
            var newFilePath = promptForFiles[0];
            this.props.onChange({
                newFile: newFilePath,
                commit: function() {
                    this.setNewValue(newFilePath);
                }.bind(this)
            });
        }
    }
    
    onInputChange() {
        this._resetDisplayValue();
    }
    
    // commits currently saved value to a new value
    setNewValue(newValue) {
        this._currentFile = newValue;
        this._resetDisplayValue();
    }
    
    // resets text input value to currently saved value
    _resetDisplayValue() {
        this._textInput.value = this._currentFile;
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftBranch.container}>
                    <TextInput
                        ref={(child) => { this._textInput = child; }}
                        style={styles.leftBranch.input}
                        label={this.props.label}
                        placeholder={this.props.placeholder}
                        onChange={this.onInputChange.bind(this)}
                        defaultValue={this.props.defaultValue}
                    />
                </View>
                <View style={styles.rightBranch.container}>
                    <Button
                        push
                        style={styles.rightBranch.button}
                        color={AppContext.ui.TERITARY_COLOUR}
                        onClick={this.onButtonClick.bind(this)}
                    >
                        {this.props.buttonLabel}
                    </Button>
                </View>
            </View>
        );
    }
}

export default ViewContent;
