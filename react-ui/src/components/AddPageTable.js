/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import NumberEntryInput from '../components/NumberEntryInput';
import NameEntryInput from '../components/NameEntryInput'
import AddNewCustomerButton from '../components/AddNewCustomerButton'
import RemoveButton from '../components/RemoveButton'
import BooleanInput from '../components/BooleanInput'
import helperFunctions from '../utils/helperFunctions'
import AuthService from '../utils/AuthService'

class AddPageTable extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.changeDataKeypress = this.changeDataKeypress.bind(this);
    this.changeCustomerNameKeypress = this.changeCustomerNameKeypress.bind(this);
    this.addCustomerButton = this.addCustomerButton.bind(this)
    this.removeCustomerButton = this.removeCustomerButton.bind(this)
    this.changeSheetEntry = this.changeSheetEntry.bind(this)
  }

  changeSheetEntry (custName, key, value) {
    this.props.changeSheetEntry(custName, key, value)
  }

  removeCustomerButton (key) {
    this.props.removeCustomer(key)
  }

  changeDataKeypress (name, value) {
    this.props.changeData(name, value);
  }

  changeCustomerNameKeypress (value) {
    this.props.changeNewCustomer(value);
  }

  addCustomerButton () {
    this.props.addCustomer();
  }

  render() {
    const { appData } = this.props
    const newScout = appData.newScout
    const sales = newScout.sales

    const findSaleNum = (type) => {
      for (let i = 0; i < appData.newCustomer.products.length; i++){
        if (appData.newCustomer.products[i].type == type){
          return appData.newCustomer.products[i].num
        }
      }
      return 0
    }

    const findName = () => {
      return appData.newCustomer.name
    }

    const textOrLink = (state, name) => {
      let result
      state.customers.map(customer => {
        if (customer['Customer Name'] === name){
          result = '' + name
        }
      })
      return result || <div>{name} <div><Link to="/customers">Add customer</Link></div></div>
    }

    const chooseColor = (state, name) => {
      let bgcolor = 'pink'
      let txtcolor = 'black'
      state.customers.map(customer => {
        if (customer['Customer Name'] === name && helperFunctions.findUses(state, customer['Customer Name']) < 1){
          bgcolor = 'white'
          txtcolor = 'black'
        }
        else if (customer['Customer Name'] === name) {
          bgcolor = 'red'
          txtcolor = 'white'
        }
      })
      return {bg: bgcolor, txt: txtcolor}
    }

    const inputType = (name, onAction) => {
      if (name.substring(name.length-1, name.length) === '?'){
        return (<BooleanInput index={name} onChange={onAction}/>)
      }
      else {
        return (<NameEntryInput placeholder="Value" onChange={onAction}/>)
      }
    }

    const display = (component) => {
      if (typeof component === 'undefined' || component == null){
        return 'Unknown'
      }
      else if (typeof component === 'boolean'){
        return displayBool(component)
      }
      else {
        return component
      }
    }

    const createInput = (component, custName, field) => {

      const onChange = (item, value) => this.changeSheetEntry(custName, field, value)

      return <NumberEntryInput placeholder="" value={helperFunctions.getProduct(appData.newScout[custName].products, field)} onChange={onChange} type=""/>
    }

    const displayBool = (bool) => {
      return (bool) ? 'Yes' : 'No'
    }

    if (appData.customerPost.isWaiting){
      return (
        <div className="loader">
          Loading
        </div>
      )
    }
    return (
      <div>
        <table>
          <thead>
            <tr><th>Customer</th>{appData.customerFields.map(field => (<th key={"header-" + field}>{field}</th>))}{Object.keys(appData.types).map(type => (<th key={"header-" + type}>{type}</th>))}{appData.pTypes.map(type => (<th key={"header-" + type}>{type}</th>))}<th>Action</th></tr>
          </thead>
          <tbody>
            {Object.keys(sales).map(saleKey => (<tr key={saleKey} style={{'backgroundColor': chooseColor(appData, saleKey).bg, 'color': chooseColor(appData, saleKey).txt}}>
              <td>{textOrLink(appData, saleKey)}</td>
              {appData.customerFields.map(field => (<td key={field}>{helperFunctions.findCustomer(appData, saleKey) ? display(helperFunctions.findCustomer(appData, saleKey)[field]) : 'Unknown'}</td>))}
              {Object.keys(appData.types).map(type => {
                const products = sales[saleKey].products;
                for (let i = 0; i < products.length; i++){
                  if (products[i].type == type) {
                    return (<td key={type}>{products[i].num}</td>)
                  }
                }
                return (<td key={type}>0</td>)
            })}
              {appData.pTypes.map(propKey => {
                return (<td key={propKey}>{display(sales[saleKey].properties[propKey])}</td>)
              })}
              <td><RemoveButton name={saleKey} onPress={this.removeCustomerButton}/></td></tr>))}
            <tr>
              <td><NameEntryInput onChange={this.changeCustomerNameKeypress}/></td>
              {appData.customerFields.map(field => (<td key={field}>{helperFunctions.findCustomer(appData, findName()) ? display(helperFunctions.findCustomer(appData, findName())[field]) : 'Unknown'}</td>))}
              {Object.keys(appData.types).map(type => (<td key={type}><NumberEntryInput
                type={type}
                value={parseInt(helperFunctions.getProduct(this.props.appData.newCustomer.products, type).num)}
                onChange={this.changeDataKeypress}/></td>))}
              {appData.pTypes.map(type => (<td key={type}>{inputType(type, this.props.changeCustomerProperty)}</td>))}
              <td><AddNewCustomerButton onPress={this.addCustomerButton}/></td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

}

AddPageTable.propTypes = {
  appData: PropTypes.object.isRequired,
  changeData: PropTypes.func.isRequired,
  changeNewCustomer: PropTypes.func.isRequired,
  addCustomer: PropTypes.func.isRequired,
  removeCustomer: PropTypes.func.isRequired,
  changeCustomerProperty: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(AuthService)
};

export default AddPageTable;

