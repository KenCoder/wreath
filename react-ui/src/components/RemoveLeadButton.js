/**
 * Created by Duncan on 7/19/2016.
 */
import React, {PropTypes} from 'react'

const RemoveLeadButton = (props) => {
  const handleChange = () => {
    props.onPress(props.cust, props.scout)
  }

  return (
    <input
      className="remove_lead"
      type="button"
      value="Delete"
      onClick={handleChange}
    />
  )
}

RemoveLeadButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  scout: PropTypes.string.isRequired,
  cust: PropTypes.string.isRequired
};

export default RemoveLeadButton
