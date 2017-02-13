/**
 * Created by Duncan on 7/21/2016.
 */
import React, {PropTypes} from 'react'

const EditScoutButton = (props) => {
  const handleChange = () => {
    props.onPress(props.name)
  }

  return (
    <input
      className="edit_scout"
      style={{visibility: props.visible}}
      type="button"
      value="Edit"
      onClick={handleChange}
    />
  )
}

EditScoutButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  visible: PropTypes.string.isRequired
};

export default EditScoutButton
