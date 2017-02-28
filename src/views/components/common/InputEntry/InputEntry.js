import React from 'react';
import { View, Label, Text } from 'react-desktop/windows';
import styled from 'styled-components';

import styles from './styles/css';
let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let Icons           = REQUIRE_LOCAL('assets/icons');

// common view element that holds input information and its related controls
class InputEntry extends React.Component {
    static defaultProps = {
        desc: '',
        icon: Icons.formIcon,
        layout: 'vertical'
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.leftBranch.container}>
                    <View style={styles.leftBranch.iconSegment}>
                        {this.props.icon}
                    </View>
                    <View layout="vertical" style={styles.leftBranch.textSegment.container}>
                        <Label style={styles.leftBranch.textSegment.title} color={AppContext.ui.TEXT_COLOUR}>{this.props.title}</Label>
                        <Text color={AppContext.ui.TEXT_COLOUR}>{this.props.desc}</Text>
                    </View>
                </View>
                <View layout={this.props.layout} style={styles.rightBranch.container}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

InputEntry.propTypes = {
    // title of this input entry
    title: React.PropTypes.string.isRequired,
    
    // more detailed description of this input entry
    desc: React.PropTypes.string.isRequired,
    
    // the icon src of this input entry
    icon: React.PropTypes.element,
    
    // layout of the various inputs displayed on the right hand side. Should only be "vertical" or "horizontal".
    layout: React.PropTypes.string
};

export default InputEntry;
