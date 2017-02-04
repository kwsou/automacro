import React from 'react';
import { View } from 'react-desktop/windows';
import { default as H1 } from './components/common/H1'

class Home extends React.Component {
    render() {
        return (
            <View layout="vertical">
            <H1 title="Welcome"/>
            </View>
        );
    }
}

export default Home;
