import React from 'react';
import { Route } from 'react-router-dom';
import {
    MasterDetailsView,
    MasterDetailsViewItem,
    MasterDetailsViewItemMaster,
    MasterDetailsViewItemDetails,
    Text
} from 'react-desktop/windows';
import {
    MainSettings,
    RobotActionSettings,
    NotificationSettings,
    LoggingSettings
} from './components/settings';

const categories = [
    {
        title: 'Main',
        component: MainSettings,
    },
    {
        title: 'Robot Actions',
        component: RobotActionSettings,
    },
    {
        title: 'Notifications',
        component: NotificationSettings,
    },
    {
        title: 'Logging',
        component: LoggingSettings,
    }
];

class Settings extends React.Component {
    static defaultProps = {
        theme: 'light',
        color: '#FF4C42'
    }
    
    render() {
        const { theme, color } = this.props;
        
        return (
            <MasterDetailsView theme={theme} color={color}>
                {categories.map((category, i) => (
                    <MasterDetailsViewItem key={'settings' + i}>
                        <MasterDetailsViewItemMaster push width="150">
                            {category.title}
                        </MasterDetailsViewItemMaster>
                        <MasterDetailsViewItemDetails>
                            <Route component={category.component} />
                        </MasterDetailsViewItemDetails>
                    </MasterDetailsViewItem>
                ))}
            </MasterDetailsView>
        );
    }
}

export default Settings;
