import React from 'react';
import { Route } from 'react-router-dom';
import {
    MasterDetailsView,
    MasterDetailsViewItem,
    MasterDetailsViewItemMaster,
    MasterDetailsViewItemDetails
} from 'react-desktop/windows';

let AppContext  = REQUIRE_LOCAL('core/common/AppContext');
let Views       = REQUIRE_LOCAL('views/components/settings');

const categories = [
    {
        title: 'Main',
        component: Views.MainSettings,
    },
    {
        title: 'Robot Actions',
        component: Views.RobotActionSettings,
    },
    {
        title: 'Notifications',
        component: Views.NotificationSettings,
    },
    {
        title: 'Logging',
        component: Views.LoggingSettings,
    }
];

class Settings extends React.Component {
    render() {
        return (
            <MasterDetailsView color={AppContext.ui.SECONDARY_COLOUR}>
                {categories.map((category, i) => (
                    <MasterDetailsViewItem key={'settings' + i}>
                        <MasterDetailsViewItemMaster push width="150">
                            {category.title}
                        </MasterDetailsViewItemMaster>
                        <MasterDetailsViewItemDetails color={AppContext.ui.TERITARY_COLOUR}>
                            <Route component={category.component} />
                        </MasterDetailsViewItemDetails>
                    </MasterDetailsViewItem>
                ))}
            </MasterDetailsView>
        );
    }
}

export default Settings;
