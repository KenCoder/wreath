/**
 * Created by Duncan on 8/22/2016.
 */
import React, { PropTypes as T } from 'react'
import { Route, Link, IndexRoute } from 'react-router';
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from '../utils/AuthService'

class LogoutPage extends React.Component {
  constructor(props, context) {
    super (props, context)

    this.logout = this.logout.bind(this)
  }

  logout () {
    this.props.auth.logout()
  }

  render () {
    return (
      <div>
        <h2>Are you sure you want to logout?</h2>
        <Link to="/"><input type="submit" onClick={this.logout} value="Yes"/></Link>
        <Link to="/"><input type="submit" value="Cancel"/></Link>
      </div>
    )
  }
}

LogoutPage.contextTypes = {
  router: T.object
}

LogoutPage.propTypes = {
  location: T.object,
  auth: T.instanceOf(AuthService)
}

export default LogoutPage;
