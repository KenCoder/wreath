/**
 * Created by Duncan on 7/21/2016.
 */
import React, {PropTypes} from 'react';

class UnusedCustomerList extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {

    const getUnused = (state) => {
      let unused = []
      Object.keys(state.sheets).map(scoutKey => {
        Object.keys(state.sheets[scoutKey].sales).map(saleKey => {
          let found = false
          for (let i = 0; i < state.customers.length; i++){
            if (saleKey === state.customers[i]['Customer Name']){
              found = true
            }
          }
          if (!found) {
            unused.splice(0, 0, saleKey)
          }
        })
      })
      return unused
    }

    return (
      <div>
        <b>Customer names not registered as customers</b>
        <ul>
          {getUnused(this.props.appData).map(element => (<li key={element}>{element}</li>))}
        </ul>
      </div>
    )
  }
}

UnusedCustomerList.propTypes = {
  appData: PropTypes.object.isRequired
}

export default UnusedCustomerList
