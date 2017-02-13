/**
 * Created by Duncan on 7/21/2016.
 */
import React, {PropTypes} from 'react'
import RemoveButton from './RemoveButton'
import NumberEntryInput from './NumberEntryInput'
import NameEntryInput from './NameEntryInput'
import UpdateProductsButton from './UpdateProductsButton'

class PricingDataTable extends React.Component {
  constructor(props, context) {
    super(props, context)
  }

  render () {

    return (
      <div>
        <b>View or Edit Prices/Kinds of Products</b>
        <table>
          <thead><tr><th>Name of Product</th><th>Cost per unit</th></tr></thead>
          <tbody>
            {Object.keys(this.props.appData.types).map(key => (
              <tr key={"price-type-row:" + key}>
                <td key={"product-type:" + key}>{key}</td>
                <td><NumberEntryInput value={this.props.appData.types[key]} onChange={this.props.changeExistingCost} type={key} key={"product-price:" + key}/></td>
                <td><RemoveButton onPress={this.props.remove} name={key}/></td>
              </tr>))}
          </tbody>
        </table>
        <br/><br/><br/><br/>
        <b>Add New Product</b>
        <table>
          <thead><tr><th>Name of Product</th><th>Cost per unit</th></tr></thead>
          <tbody>
            <tr>
              <td><NameEntryInput onChange={this.props.changeNewName}/></td><td><NumberEntryInput type='change_new_cost' onChange={this.props.changeNewCost}/></td>
            </tr>
          </tbody>
        </table>
        <UpdateProductsButton onPress={this.props.pushNewProduct}/>
      </div>
    )
  }
}

PricingDataTable.propTypes = {
  appData: PropTypes.object.isRequired,
  changeExistingCost: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  changeNewName: PropTypes.func.isRequired,
  changeNewCost: PropTypes.func.isRequired,
  pushNewProduct: PropTypes.func.isRequired,
}

export default PricingDataTable
