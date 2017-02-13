/**
 * Created by Duncan on 8/22/2016.
 */
import React from 'react'

const LoginRequiredPage = (props) => {
  return (
    <div>
      <h1>Restricted area. Login required (login with button above).</h1>
      <img src="../resources/Halt Sign.png" alt="Access Denied." style={{width: "405px", height: "405px"}}/>
    </div>
  )
}

export default LoginRequiredPage
