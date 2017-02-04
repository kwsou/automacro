import React from 'react';
import { View } from 'react-desktop/windows';
import styled from 'styled-components';

// common view element that contains a specific margin and padding specification
class ViewContent extends React.Component {
    render() {
        return (
            <View
                layout="vertical"
                horizontalAlignment="left"
                margin="0px 20px 20px 10px"
                padding="5px"
                theme="light"
                width="100%"
            >
                {this.props.children}
            </View>
        );
    }
}

export default ViewContent;
