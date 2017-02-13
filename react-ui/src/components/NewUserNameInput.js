/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react';

const NewUserNameInput = (props) => {
  const handleChange = (e) => {
    props.onChange(e.target.value);
  };

  return (
    <input
      className="new_user"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}/>
  );
};

NewUserNameInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default NewUserNameInput;
