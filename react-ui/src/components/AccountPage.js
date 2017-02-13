/**
 * Created by Duncan on 8/22/2016.
 */
import React, {PropTypes} from 'react'
import AuthService from '../utils/AuthService'
import helperFunctions from '../utils/helperFunctions'
import NameEntryInput from '../components/NameEntryInput'
import EditButton from '../components/EditButton'

class AccountPage extends React.Component {
  constructor (props, context) {
    super (props, context)

    this.onChange = this.onChange.bind(this)
  }

  onChange = (e) => {
    this.props.changeA0User('name', e)
  }


  render () {
    const auth = this.props.auth
    auth.updateProfile()
    const user = JSON.parse(localStorage.getItem('profile')) || {}
    this.props.populateA0User({name: helperFunctions.getMetadata(user, 'name', helperFunctions.getProp(user, 'name', ''))})

    return (
      <div>
        <h2>My Account</h2>
        <table>
          <thead><th><b>Name</b></th><th><b>Email</b></th></thead>
          <tbody><td><NameEntryInput value={this.props.appData.newUserData.name} onChange={this.onChange}/></td><td>{user.email || ''}</td></tbody>
        </table>
      </div>
    )
  }
}

AccountPage.propTypes = {
  changeA0User: PropTypes.func.isRequired,
  populateA0User: PropTypes.func.isRequired,
  appData: PropTypes.object.isRequired,
  auth: PropTypes.instanceOf(AuthService)
}

export default AccountPage
