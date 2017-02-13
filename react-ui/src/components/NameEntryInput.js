/**
 * Created by Duncan on 7/19/2016.
 */

import React, {PropTypes} from 'react';

const NameEntryInput = (props) => {

  const handleChange = (e) => {
    props.onChange(e.target.value)
  }

  return (
    <input
      className="new_customer_name"
      type="text"
      placeholder={props.placeholder || "New Customer Name"}
      value={props.value}
      onChange={handleChange}/>
  )

}

NameEntryInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string,
  placeholder: PropTypes.string
}

export default NameEntryInput
