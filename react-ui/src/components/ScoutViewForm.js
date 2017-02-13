import React, {PropTypes} from 'react';
import ScoutViewTextInput from './ScoutViewTextInput';
import ScoutViewYearInput from './ScoutViewYearInput';
import './../styles/ScoutViewForm.css';
import helperFunctions from '../utils/helperFunctions'

class ScoutViewForm extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.changeUsernameKeypress = this.changeUsernameKeypress.bind(this)
    this.changeYearKeypress = this.changeYearKeypress.bind(this)
  }

  changeUsernameKeypress(name, value) {
    this.props.changeUsername(this.props.appData, name, value);
  }

  changeYearKeypress(value) {
    this.props.changeYear(value)
  }

  render() {
    const {appData} = this.props;

    const sheet_id = helperFunctions.findCurrentSheetID(appData, appData.username, appData.year)
    let user = '';
    if (sheet_id !== 0) {
      user = appData.username;
    }
    else {
      user = 'default';
    }


    const chooseColor = (state, name) => {
      let bgcolor = 'purple'
      let txtcolor = 'white'
      state.customers.map(customer => {
        if (customer['Customer Name'] === name && helperFunctions.findUses(state, customer['Customer Name']) < 2){
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

    const displayBool = (bool) => {
      if (bool) {
        return "Yes"
      }
      else {
        return "No"
      }
    }

    const sales = appData.sheets[sheet_id].sales

    if (appData.superuser) {
      return (
        <div>
          <h3>Scout: <ScoutViewTextInput onChange={this.changeUsernameKeypress} name="scout_user" value={appData.username}/>   Year: <ScoutViewYearInput onChange={this.changeYearKeypress} name="scout_year" value={appData.year}/></h3>
          <h2>Sales Information for {user} (Year: {appData.year})</h2>
          <table className="table">
            <thead>
              <tr><th>Customer</th>{appData.customerFields.map(field => (<th key={"header-" + field}>{field}</th>))}{Object.keys(appData.types).map(type => (<th key={"header-" + type}>{type}</th>))}{appData.pTypes.map(type => (<th key={"header-" + type}>{type}</th>))}<th>Amount Owed</th></tr>
            </thead>
            <tbody>
              {Object.keys(sales).map(saleKey => (
                <tr key={saleKey} >
                  <td style={{'backgroundColor': chooseColor(appData, saleKey).bg, 'color': chooseColor(appData, saleKey).txt}}>{saleKey}</td>
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
                  <td>{'$' + (helperFunctions.customerValue(appData, sheet_id, saleKey)).toFixed(2)}</td>
                </tr>))}
            <tr>
              <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Sold</b></td>
              {appData.customerFields.map(field => (<th key={"no1-" + field}/>))}
              {Object.keys(appData.types).map(type => (<td key={type}>{helperFunctions.numProduct(appData.sheets[sheet_id], type)}</td>))}
              {appData.pTypes.map(propKey => (<td key={propKey}/>))}
              <td/>
            </tr>
            <tr>
              <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Value</b></td>
              {appData.customerFields.map(field => (<th key={"no2-" + field}/>))}
              {Object.keys(appData.types).map(type => (<td key={type}>{'$' + (helperFunctions.numProduct(appData.sheets[sheet_id], type)*appData.types[type]).toFixed(2)}</td>))}
              {appData.pTypes.map(propKey => (<td key={propKey}/>))}
              <td>{'$' + helperFunctions.scoutValue(appData, sheet_id).toFixed(2)}</td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
    else {
      return (
        <div>
          <h3>Scout: {appData.username}   Year: <ScoutViewYearInput onChange={this.changeYearKeypress} name="scout_year" value={appData.year}/></h3>
          <h2>Sales Information for {user} (Year: {appData.year})</h2>
          <table className="table">
            <thead>
            <tr><th>Customer</th>{appData.customerFields.map(field => (<th key={"header-" + field}>{field}</th>))}{Object.keys(appData.types).map(type => (<th key={"header-" + type}>{type}</th>))}{appData.pTypes.map(type => (<th key={"header-" + type}>{type}</th>))}<th>Amount Owed</th></tr>
            </thead>
            <tbody>
            {Object.keys(sales).map(saleKey => (
              <tr key={saleKey} >
                <td style={{'backgroundColor': chooseColor(appData, saleKey).bg, 'color': chooseColor(appData, saleKey).txt}}>{saleKey}</td>
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
                <td>{'$' + (helperFunctions.customerValue(appData, sheet_id, saleKey)).toFixed(2)}</td>
              </tr>))}
            <tr>
              <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Sold</b></td>
              {appData.customerFields.map(field => (<th key={"no1-" + field}/>))}
              {Object.keys(appData.types).map(type => (<td key={type}>{helperFunctions.numProduct(appData.sheets[sheet_id], type)}</td>))}
              {appData.pTypes.map(propKey => (<td key={propKey}/>))}
              <td/>
            </tr>
            <tr>
              <td style={{'backgroundColor': 'grey', 'color':'white'}}><b>Total Value</b></td>
              {appData.customerFields.map(field => (<th key={"no2-" + field}/>))}
              {Object.keys(appData.types).map(type => (<td key={type}>{'$' + (helperFunctions.numProduct(appData.sheets[sheet_id], type)*appData.types[type]).toFixed(2)}</td>))}
              {appData.pTypes.map(propKey => (<td key={propKey}/>))}
              <td>{'$' + helperFunctions.scoutValue(appData, sheet_id).toFixed(2)}</td>
            </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

ScoutViewForm.propTypes = {
  changeUsername: PropTypes.func.isRequired,
  changeYear: PropTypes.func.isRequired,
  appData: PropTypes.object.isRequired
};

export default ScoutViewForm;
