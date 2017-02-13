/**
 * Created by Duncan on 7/20/2016.
 */
import React, {PropTypes} from 'react';

const BooleanInput = (props) => {

  const handleChangeTrue = () => {
    props.onChange(props.index, true)
  }

  const handleChangeFalse = () => {
    props.onChange(props.index, false)
  }

  return (
    <form action="">
      <input
        name={props.name || 'inputBool'}
        type="radio"
        onClick={handleChangeTrue}
      />T<br/>
      <input
        name={props.name || 'inputBool'}
        type="radio"
        onClick={handleChangeFalse}
      />F
    </form>
  )

}

BooleanInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  index: PropTypes.string.isRequired,
  name: PropTypes.string
}

export default BooleanInput
