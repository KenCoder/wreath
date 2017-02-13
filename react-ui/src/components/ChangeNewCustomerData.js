/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';

const ChangeNewCustomerData = (props) => {

  const handleChange = (e) => {
    props.onChange(props.index, e.target.value)
  }

  return (
    <input
      className="new_static_customer_name"
      type="text"
      placeholder={props.placeholder || "Enter value"}
      value={props.value}
      onChange={handleChange}
    />
  )

}

ChangeNewCustomerData.propTypes = {
  onChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string
}

export default ChangeNewCustomerData
