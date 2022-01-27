import React, {
    FunctionComponent
} from 'react';

import {
    BrowserRouter,
    Switch,
    Route
} from 'react-router-dom';

import {
    Theme,
    presetGpnDefault
} from '@consta/uikit/Theme';

import {About} from './pages/About';
import {More} from './pages/More';
import {PortalMenu} from './components/PortalMenu';
import {Layout} from './components/Layout';
import {Routes} from './routes';

type Props = {};

const App: FunctionComponent<Props> = () => {
    return (
        <Theme preset={presetGpnDefault}>
            <BrowserRouter>
                <Layout header={<PortalMenu/>}>
                    <Switch>
                        <Route path={[Routes.HOME, Routes.ABOUT]} exact={true}>
                            <About/>
                        </Route>

                        <Route path={Routes.MORE}>
                            <More />
                        </Route>
                    </Switch>
                </Layout>
            </BrowserRouter>
        </Theme>
    );
};

export {App};
