import React from 'react';
import { View } from 'react-desktop/windows';

import styles from './styles/css';

// common view element that contains a specific margin and padding specification
class ContentView extends React.Component {
    render() {
        return (
            <View
                layout={styles.container.layout}
                horizontalAlignment={styles.container.horizontalAlignment}
                margin={styles.container.margin}
                padding={styles.container.padding}
                width={styles.container.width}
            >
                {this.props.children}
            </View>
        );
    }
}

ContentView.propTYpes = {};

export default ContentView;
