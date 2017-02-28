import electron from 'electron';
import React from 'react';
import { TextInput, Button, View } from 'react-desktop/windows';

import styles from './styles/css';
let AppContext  = REQUIRE_LOCAL('core/common/AppContext');
let Util        = REQUIRE_LOCAL('core/common/Util');

// common file input element containing non-editable text input field and browse button
class FileInput extends React.Component {
    static defaultProps = {
        placeholder: '',
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
                        title={this._currentFile}
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

FileInput.propTypes = {
    // label for the text input field
    label: React.PropTypes.string.isRequired,
    
    // placeholder for the text input field when there is no value
    placeholder: React.PropTypes.string,
    
    // default value for the text input field
    defaultValue: React.PropTypes.string,
    
    // label for the "choose file" button
    buttonLabel: React.PropTypes.string,
    
    // callback function invoked when a file has been selected. It has the following signature: callback({ newFile: <string>, commit: <function> }).
    //  where newFile is the file path of the selected file, and commit must be invoked if we want to persist newFile as the new text input value.
    onChange: React.PropTypes.func,
    
    // an array of object containing file name extension filters for the file selection dialog
    fileFilters: React.PropTypes.arrayOf(React.PropTypes.object)
};

export default FileInput;
