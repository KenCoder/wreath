import React, {PropTypes} from 'react';

const ScoutViewTextInput = (props) => {
  const handleChange = (e) => {
    props.onChange(props.name, e.target.value);
  };

  return (
    <input
      style={{width: 100 + 'px'}}
      className="small"
      type="text"
      placeholder={props.placeholder}
      value={props.value}
      onChange={handleChange}/>
  );
};

ScoutViewTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default ScoutViewTextInput;
