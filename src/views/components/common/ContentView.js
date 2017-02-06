import React from 'react';
import { View } from 'react-desktop/windows';

let AppContext = REQUIRE_LOCAL('core/common/AppContext');
let styles  = REQUIRE_LOCAL('views/components/common/ContentViewCSS');

// common view element that contains a specific margin and padding specification
class ViewContent extends React.Component {
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

export default ViewContent;
