/**
 * Created by Duncan on 7/19/2016.
 */
import React, {PropTypes} from 'react'

const AddNewCustomerButton = (props) => {
  const handleChange = () => {
    props.onPress()
  }
  
  return (
    <input
      className="submit_new_cust"
      type="button"
      value="Add"
      onClick={handleChange}
    />
  )
}

AddNewCustomerButton.propTypes = {
  onPress: PropTypes.func.isRequired
};

export default AddNewCustomerButton
