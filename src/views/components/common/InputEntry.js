import React from 'react';
import { View, Label, Text } from 'react-desktop/windows';
import styled from 'styled-components';
import * as Icons from '../../../assets/icons';

const styles = {
    container: {
        width: '100%',
        margin: '10px 0px'
    },
    
    leftBranch: {
        container: {
            width: '40%'
        },
        iconSegment: {
            width: '16px',
            padding: '7px 0px',
            margin: '0px 10px 0px 0px'
        },
        textSegment: {
            container: {
                padding: '0px 10px 0px 0px'
            },
            title: {
                'fontWeight': 'bold'
            }
        }
    },
    
    rightBranch: {
        container: {
            width: '60%',
            padding: '5px 0px 0px 10px'
        }
    }
};

// common view element that holds input information and its related controls
class InputEntry extends React.Component {
    static defaultProps = {
        theme: 'light',
        title: 'Sample Input Title',
        desc: 'Sample Input Description. Lengthy sentences.',
        icon: Icons.formIcon
    }
    
    render() {
        const { theme, title, desc, icon } = this.props;
        
        return (
            <View theme={theme} style={styles.container}>
                <View style={styles.leftBranch.container}>
                    <View style={styles.leftBranch.iconSegment}>
                        {icon}
                    </View>
                    <View layout="vertical" style={styles.leftBranch.textSegment.container}>
                        <div style={styles.leftBranch.textSegment.title}>
                            <Label>{title}</Label>
                        </div>
                        <Text>{desc}</Text>
                    </View>
                </View>
                <View layout="vertical" style={styles.rightBranch.container}>
                    {this.props.children}
                </View>
            </View>
        );
    }
}

export default InputEntry;
