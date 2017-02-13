/**
 * Created by Duncan on 8/16/2016.
 */
import React, {PropTypes} from 'react';

const ScoutViewTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      style={{width: 100 + 'px'}}
      className="small"
      type="number"
      value={props.value}
      onChange={handleChange}/>
  );
};

ScoutViewTextInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

export default ScoutViewTextInput;
