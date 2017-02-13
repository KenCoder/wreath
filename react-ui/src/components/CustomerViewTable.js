/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';
import AddCustomerTable from './AddCustomerTable'
import RemoveCustomerButton from './RemoveCustomerButton'
import UnusedCustomerList from './UnusedCustomerList'
import helperFunctions from '../utils/helperFunctions'

class CustomerViewTable extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.changeStaticCustomerData = this.changeStaticCustomerData.bind(this)
    this.addNewStaticCustomerLead = this.addNewStaticCustomerLead.bind(this)
    this.deleteCustomer = this.deleteCustomer.bind(this)
  }

  changeStaticCustomerData (key, name) {
    this.props.changeStaticCustomerData(key, name)
  }

  deleteCustomer (id) {
    this.props.deleteCustomer(id)
  }

  addNewStaticCustomerLead (scout_id) {
    this.props.addNewStaticCustomerLead(scout_id)
  }

  render () {

    const display = (component) => {
      if (typeof component === 'boolean'){
        return displayBool(component)
      }
      else {
        return component
      }
    }

    const displayBool = (bool) => {
      if (bool) {
        return "Yes"
      }
      else {
        return "No"
      }
    }

    const chooseColor = (customer) => {
      let uses = helperFunctions.findUses(this.props.appData, customer['Customer Name'])
      if (uses < 1){
        return 'green'
      }
      else if (uses === 1) {
        return 'blue'
      }
      else {
        return 'red'
      }
    }

    const scout_id = helperFunctions.lookupScoutByName(this.props.appData, this.props.appData.username)._id
    const customers = helperFunctions.getCustomers(this.props.appData.superuser, helperFunctions.lookupScoutByName(this.props.appData, this.props.appData.username), this.props.appData.customers)
    const fields = this.props.appData.customerFields


    if (this.props.appData.superuser) {
      return (
        <div>
          <table>
            <thead>
              <tr>{this.props.appData.customerFields.map(field => (<th key={field}>{field}</th>))}</tr>
            </thead>
            <tbody>
              { customers.map(customer => (<tr key={customer._id + '-row'} style={{'backgroundColor': chooseColor(customer), 'color': 'white'}}>{fields.map(field => (<td key={customer._id + '-cell' + '-' + field}>{display(customer[field]) || 'Unknown'}</td>))}<td><RemoveCustomerButton onPress={this.props.deleteCustomer} custID={customer._id}/></td></tr>))}
            </tbody>
          </table>
          <br/><br/><br/>
          <UnusedCustomerList appData={this.props.appData} />
          <br/><br/>
          <AddCustomerTable changeStaticCustomerData={this.changeStaticCustomerData} appData={this.props.appData} addNewStaticCustomer={this.props.addNewStaticCustomer}/>
        </div>
      )
    } else {
      return (
        <div>
          <table>
            <thead>
            <tr>{this.props.appData.customerFields.map(field => (<th key={field}>{field}</th>))}</tr>
            </thead>
            <tbody>
            { customers.map(customer => (<tr key={customer._id + '-row'} style={{'backgroundColor': chooseColor(customer), 'color': 'white'}}>{fields.map(field => (<td key={customer._id + '-cell' + '-' + field}>{display(customer[field]) || 'Unknown'}</td>))}<td><RemoveCustomerButton onPress={this.props.deleteCustomer} custID={customer._id}/></td></tr>))}
            </tbody>
          </table>
          <br/><br/><br/>
          <UnusedCustomerList appData={this.props.appData} />
          <br/><br/>
          <AddCustomerTable changeStaticCustomerData={this.changeStaticCustomerData} appData={this.props.appData} addNewStaticCustomer={() => this.addNewStaticCustomerLead(scout_id)}/>
        </div>
      )
    }
  }

}

CustomerViewTable.propTypes = {
  appData: PropTypes.object.isRequired,
  changeStaticCustomerData: PropTypes.func.isRequired,
  addNewStaticCustomer: PropTypes.func.isRequired,
  addNewStaticCustomerLead: PropTypes.func.isRequired,
  deleteCustomer: PropTypes.func.isRequired
}

export default CustomerViewTable
