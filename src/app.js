import electron from 'electron';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { matchPath, withRouter } from 'react-router';
import { Window, TitleBar, NavPane, NavPaneItem, Button } from 'react-desktop/windows';

import env from './env';
import { Home, Settings } from './views';
import * as Icons from './assets/icons';

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

class App extends Component {
    static defaultProps = {
        theme: 'light',
        color: '#42F5FF',
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
        const { replace, location, theme, color } = this.props;
        
        return (
            <Window theme={theme} color={color}>
            <TitleBar title="Automacro" controls
                onCloseClick={() => {
                    electron.remote.getCurrentWindow().close();
                }}
                onMinimizeClick={() => {
                    electron.remote.getCurrentWindow().minimize();
                }}
                onMaximizeClick={this.toggleMaximize}
                onRestoreDownClick={this.toggleMaximize}
            />
            <NavPane theme={theme} color={color} paneExpandedLength="120px">
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
                        color={color}
                        theme="dark"
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
        if(env.IS_DEV_MODE && false) {
            return <Button push onClick={() => electron.remote.getCurrentWindow().reload()}>R</Button>;
        }
        return <div/>;
    }
}

export default withRouter(App);
