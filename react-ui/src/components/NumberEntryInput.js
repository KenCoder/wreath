/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react';

const NumberEntryInput = (props) => {

  const handleChange = (e) => {
    props.onChange(props.type, e.target.value);
  };

  return (
    <input
      className="small"
      type="number"
      min="1"
      max="9999"
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}/>
  );
};

NumberEntryInput.propTypes = {
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.number,
  value: PropTypes.number
};

export default NumberEntryInput;
