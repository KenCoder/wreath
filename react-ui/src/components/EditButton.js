/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react'

const EditButton = (props) => {
  const handleChange = () => {
    props.onPress(props.name)
  }

  return (
    <input
      className="edit_new_cust"
      type="button"
      value="Edit"
      onClick={handleChange}
    />
  )
}

EditButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default EditButton
