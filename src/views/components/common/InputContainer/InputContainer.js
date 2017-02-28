import React from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';

import styles from './styles/css';

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

InputContainer.propTypes = {};

export default InputContainer;
