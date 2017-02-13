/**
 * Created by Duncan on 8/17/2016.
 */
import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from '../actions/appActions'
import ScoutAssignmentsCell from '../components/ScoutAssignmentsCell'
import helperFunctions from '../utils/helperFunctions'


export const CustomerAssignmentPage = (props) => {

  const scouts = props.appData.scoutList
  const ordered = helperFunctions.sortByKey(scouts, 'name')

  return (
    <div>
      {ordered.map(scout => (
        <ScoutAssignmentsCell appData={props.appData} scout={scout} onChange={props.actions.addLead} onPress={props.actions.removeLead} />
      ))}
    </div>
  )
}

CustomerAssignmentPage.propTypes = {
  appData: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    appData: state.appData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerAssignmentPage)
