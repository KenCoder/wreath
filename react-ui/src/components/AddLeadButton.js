/**
 * Created by Duncan on 8/19/2016.
 */
import React, {PropTypes} from 'react'

const AddLeadButton = (props) => {
  const handleChange = () => {
    props.onPress()
  }

  return (
    <input
      className={"add_lead_button:" + props.scoutName}
      type="button"
      value="Assign Lead"
      onClick={handleChange}
    />
  )
}

AddLeadButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  scoutName: PropTypes.string
};

export default AddLeadButton
