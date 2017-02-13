/**
 * Created by Duncan on 8/22/2016.
 */
import React, { PropTypes as T } from 'react'
import { Route, Link, IndexRoute } from 'react-router';
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'
import Popup from 'react-popup'
import Login from './Login'
import styles from '../styles/login.styles.css'
import helperFunctions from '../utils/helperFunctions'

class AuthButton extends React.Component {
  constructor (props, context) {
    super(props, context)
  }

  render () {
    const { auth } = this.props
    const username = localStorage.getItem('profile') ? helperFunctions.getProp(JSON.parse(localStorage.getItem('profile')), 'name', 'Name Unknown') : 'Name Unknown'

    if (auth.loggedIn())
      return (
        <div>
          Welcome, {username}!<Link to="/logout" style={{"marginLeft":"30px"}}><input type="button" value="Logout"/></Link>
        </div>
      )
    else
      return (
        <div>
          <Login auth={auth}/>
        </div>
      )
  }
}

AuthButton.contextTypes = {
  router: T.object
}

AuthButton.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
}

export default AuthButton;
