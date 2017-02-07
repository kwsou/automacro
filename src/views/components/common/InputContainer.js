import React from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';

let styles  = REQUIRE_LOCAL('views/components/common/InputContainerCSS.js');

// common view element that holds one input element
class InputContainer extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                {this.props.children}
            </View>
        );
    }
}

export default InputContainer;
