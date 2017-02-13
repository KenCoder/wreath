/**
 * Created by Duncan on 7/18/2016.
 */
import React, {PropTypes} from 'react'

const UpdateProductsButton = (props) => {
  const handleChange = () => {
    props.onPress();
  }

  return (
    <input
      className="submit_new_scout"
      type="button"
      value="Submit new product and update existing products"
      onClick={handleChange}
    />
  )
};

UpdateProductsButton.propTypes = {
  onPress: PropTypes.func.isRequired
};


export default UpdateProductsButton;
