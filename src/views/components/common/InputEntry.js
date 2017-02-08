import React from 'react';
import { View, Label, Text } from 'react-desktop/windows';
import styled from 'styled-components';

let AppContext      = REQUIRE_LOCAL('core/common/AppContext');
let styles          = REQUIRE_LOCAL('views/components/common/InputEntryCSS.js');
let Icons           = REQUIRE_LOCAL('assets/icons');

// common view element that holds input information and its related controls
class InputEntry extends React.Component {
    static defaultProps = {
        title: 'Sample Input Title',
        desc: 'Sample Input Description. Lengthy sentences.',
        layout: 'vertical',
        icon: Icons.formIcon
    }
    
    render() {
        const { title, desc, layout, icon } = this.props;
        
        return (
            <View style={styles.container}>
                <View style={styles.leftBranch.container}>
                    <View style={styles.leftBranch.iconSegment}>
                        {icon}
                    </View>
                    <View layout="vertical" style={styles.leftBranch.textSegment.container}>
                        <Label style={styles.leftBranch.textSegment.title} color={AppContext.ui.TEXT_COLOUR}>{title}</Label>
                        <Text color={AppContext.ui.TEXT_COLOUR}>{desc}</Text>
                    </View>
                </View>
                <View layout={layout} style={styles.rightBranch.container}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default InputEntry;
