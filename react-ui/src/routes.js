import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/App';
import HomePage from './components/HomePage';
import ScoutViewPage from './containers/ScoutViewPage'; // eslint-disable-line import/no-named-as-default
import AuthService from './utils/AuthService'
import AboutPage from './components/AboutPage.js';
import NotFoundPage from './components/NotFoundPage.js';
import AddPage from './containers/AddPage.js'
import CustomerViewPage from './containers/CustomerViewPage'
import CustomerAssignmentPage from './containers/CustomerAssignmentPage'
import PricingDataPage from './containers/PricingDataPage'
import Login from './components/Login'
import LoginRequiredPage from './containers/LoginRequiredPage'
import LogoutPage from './components/LogoutPage'

const AUTH0_CLIENT_ID='w4OXxCfEdARIAEdYVrjUENr8LP2AVDcT'
const AUTH0_DOMAIN='troop125.auth0.com'

const auth = new AuthService(AUTH0_CLIENT_ID, AUTH0_DOMAIN)

const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login'})
  }
}

export default (
  <Route path="/" component={App} auth={auth}>
    <IndexRoute component={HomePage}/>
    <Route path="scout-view" component={ScoutViewPage} onEnter={requireAuth}/>
    <Route path="about" component={AboutPage} onEnter={requireAuth}/>
    <Route path="edit" component={AddPage} onEnter={requireAuth}/>
    <Route path="customers" component={CustomerViewPage} onEnter={requireAuth}/>
    <Route path="leads" component={CustomerAssignmentPage} onEnter={requireAuth}/>
    <Route path="products" component={PricingDataPage} onEnter={requireAuth}/>
    <Route path="login" component={LoginRequiredPage} />
    <Route path="logout" component={LogoutPage} />
    <Route path="*" component={NotFoundPage}/>
  </Route>)
