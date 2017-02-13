/**
 * Created by Duncan on 7/19/2016.
 */
import React, {PropTypes} from 'react'

const RemoveButton = (props) => {
  const handleChange = () => {
    props.onPress(props.name)
  }

  return (
    <input
      className="remove_new_cust"
      type="button"
      value="Delete"
      onClick={handleChange}
    />
  )
}

RemoveButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export default RemoveButton
