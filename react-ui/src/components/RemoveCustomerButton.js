/**
 * Created by Duncan on 7/19/2016.
 */
import React, {PropTypes} from 'react'

const RemoveCustomerButton = (props) => {
  const handleChange = () => {
    props.onPress(props.custID)
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

RemoveCustomerButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  custID: PropTypes.string.isRequired
};

export default RemoveCustomerButton
