import React from 'react';
import { Route } from 'react-router-dom';
import {
    MasterDetailsView,
    MasterDetailsViewItem,
    MasterDetailsViewItemMaster,
    MasterDetailsViewItemDetails
} from 'react-desktop/windows';

let AppContext              = REQUIRE_LOCAL('core/common/AppContext');
let MainSettings            = REQUIRE_LOCAL('views/components/settings/MainSettings');
let RobotActionSettings     = REQUIRE_LOCAL('views/components/settings/RobotActionSettings');
let NotificationSettings    = REQUIRE_LOCAL('views/components/settings/NotificationSettings');
let LoggingSettings         = REQUIRE_LOCAL('views/components/settings/LoggingSettings');

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
