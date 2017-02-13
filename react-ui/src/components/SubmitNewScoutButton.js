/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react'

const SubmitNewScoutButton = (props) => {
  const handleChange = () => {
    props.onPress();
  }

  return (
    <input
      className="submit_new_scout"
      type="button"
      value="Submit"
      onClick={handleChange}
    />
  )
};

SubmitNewScoutButton.propTypes = {
  onPress: PropTypes.func.isRequired
};


export default SubmitNewScoutButton;
