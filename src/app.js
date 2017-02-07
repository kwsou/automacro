// Main App driver
import electron from 'electron';
import React from 'react';
import { matchPath, withRouter } from 'react-router';
import { Window, TitleBar, NavPane, NavPaneItem, Button } from 'react-desktop/windows';
import { Route } from 'react-router-dom';

import path from 'path';

// set global function to resolve local file names so we can avoid ugly relative paths like this: require('../../src/herpa/derp')
// base path is /src. ECMA 6 compatible
global.REQUIRE_LOCAL = filepath => {
    var pkg = require(path.join(__dirname, filepath));
    if(pkg.default) {
        return pkg.default;
    }
    return pkg;
};

let AppContext  = REQUIRE_LOCAL('core/common/AppContext');
let Home        = REQUIRE_LOCAL('views/Home');
let Settings    = REQUIRE_LOCAL('views/Settings');
let Icons       = REQUIRE_LOCAL('assets/icons');

const routes = [
    {
        path: '/',
        exact: true,
        title: 'Home',
        icon: Icons.welcomeIcon,
        component: Home,
    },
    {
        path: '/settings',
        title: 'Settings',
        icon: Icons.formIcon,
        component: Settings,
    }
];

class App extends React.Component {
    constructor(props) {
        super(props);
        
        // retrieve config file and load settings onto memory via AppContext
        AppContext.importConfig(path.join(__dirname, '..'));
    }
    
    toggleMaximize = function() {
        var window = electron.remote.getCurrentWindow();
        if(!window.isMaximized()) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    }
    
    render() {
        const { replace, location } = this.props;
        
        return (
            <Window theme={AppContext.ui.theme} color={AppContext.ui.primaryColour}>
            <TitleBar title={AppContext.app.NAME} controls
                onCloseClick={() => {
                    electron.remote.getCurrentWindow().close();
                }}
                onMinimizeClick={() => {
                    electron.remote.getCurrentWindow().minimize();
                }}
                onMaximizeClick={this.toggleMaximize}
                onRestoreDownClick={this.toggleMaximize}
            />
            <NavPane canPaneToggle={false} paneExpandedLength="120px">
                {routes.map(route => (
                    <NavPaneItem
                        key={route.path}
                        title={route.title}
                        icon={route.icon}
                        selected={Boolean(matchPath(location.pathname, route.path, {
                            exact: route.exact, strict: route.strict,
                        }))}
                        onSelect={() => {
                            replace(route.path);
                        }}
                        push
                    >
                        <Route exact={route.exact} path={route.path} component={route.component} />
                    </NavPaneItem>
                ))}
            </NavPane>
            {this.renderRefreshButton()}
            </Window>
        );
    }
    
    renderRefreshButton() {
        if(AppContext.env.IS_DEV_MODE && false) {
            return <Button push onClick={() => electron.remote.getCurrentWindow().reload()}>R</Button>;
        }
        return <div/>;
    }
}

export default withRouter(App);
