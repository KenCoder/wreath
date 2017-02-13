/**
 * Created by Duncan on 8/23/2016.
 */
import React, {PropTypes} from 'react'
import AddPage from './AddPage'
import AddPageTable from '../components/AddPageTable'
import NewUserNameInput from '../components/NewUserNameInput'
import SubmitNewScoutButton from '../components/SubmitNewScoutButton'
import EditScoutButton from '../components/EditScoutButton'
import AuthService from '../utils/AuthService'
import helperFunctions from '../utils/helperFunctions'
import NumberEntryInput from '../components/NumberEntryInput'

class AddPageWrapper extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.componentWillMount = this.componentWillMount.bind(this)
  }

  componentWillMount() {
    const user = JSON.parse(localStorage.getItem('profile'))
    const name = helperFunctions.getName(user)
    this.props.actions.changeNewUser(name)
    if (helperFunctions.validateSheet(this.props.appData, name, this.props.appData.year)){
      this.props.actions.getScoutInfo(name)
    }
  }

  render () {
    const user = JSON.parse(localStorage.getItem('profile'))
    const name = helperFunctions.getName(user)
    const _this = this
    const appData = this.props.appData
    const actions = this.props.actions

    const handleChange = (type, e) => {
      _this.props.actions.changeYear(parseInt(e))
      actions.getScoutInfo(appData.newScout.name)
    }

    return (
      <div>
        <label style={{"marginRight":"30px", "fontSize":"20pt"}}>Name of scout: {name}</label><label style={{"fontSize":"20pt"}}>Year: </label>
        <NumberEntryInput type="year" value={appData.year} onChange={handleChange} />
        <br/><br/>
        <AddPageTable
          appData={appData}
          changeData={actions.changeData}
          changeNewCustomer={actions.changeNewCustomer}
          addCustomer={actions.addCustomer}
          removeCustomer={actions.removeCustomer}
          changeCustomerProperty={actions.changeCustomerProperty}
          auth={this.props.auth}
        />
        <br/><br/>
        <SubmitNewScoutButton onPress={actions.submitNewScout}/>
      </div>
    )
  }
}

AddPageWrapper.propTypes = {
  appData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  auth: PropTypes.instanceOf(AuthService)
}

export default AddPageWrapper
