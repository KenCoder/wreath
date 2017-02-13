import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import { Link, IndexLink } from 'react-router'
import AuthButton from './AuthButton'
import LoadingSymbol from './LoadingSymbol'
import helperFunctions from '../utils/helperFunctions'

const App = (props) => {
  const superuser = props.appData.superuser
  const loading = props.appData.loading
  let children = null
  if (props.children) {
    children = React.cloneElement(props.children, {
      auth: props.route.auth, //sends auth instance from route to children
      superuser: superuser,
      loading: loading
    })
  }
  if (loading) {return <LoadingSymbol/>}
  else if (superuser) {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/scout-view">Scout Viewer</Link>
        {' | '}
        <Link to="/edit">Add/Edit Scout[s]</Link>
        {' | '}
        <Link to="/customers">All Customers</Link>
        {' | '}
        <Link to="/leads">Assign Leads</Link>
        {' | '}
        <Link to="/products">Manage Products</Link>
        <AuthButton auth={props.route.auth}/>
        <br/>
        {children}
      </div>
    )
  } else {
    return (
      <div>
        <IndexLink to="/">Home</IndexLink>
        {' | '}
        <Link to="/scout-view">Summary</Link>
        {' | '}
        <Link to="/edit">Edit Spreadsheets</Link>
        {' | '}
        <Link to="/customers">My Customers</Link>
        <AuthButton auth={props.route.auth}/>
        <br/>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  children: PropTypes.element
}

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}
function mapDispatchToProps(dispatch) {
  return {
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
