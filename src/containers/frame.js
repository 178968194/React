import {connect} from 'react-redux'
import FrameDumb from 'modules/shared/layouts/frame'
import * as basicAction from '../actions/basicAction'
import {globalSelector} from '../reducers'
import {get} from 'utils/immutableUtils'

function mapStateToProps(state) {
  // ---global
  let global = globalSelector(state)
  return {
    common: {
      controls: get(global, 'controls')
    },
    dashboard: {
    },
    home: {
    },
    requirement: {}
  }
}

function mapDispatchToProps(dispatch) {
  debugger
  return {
    dashboardFunction: {
      basicMethods: {
        updateGlobal: (keyPath, data, merge) => dispatch(basicAction.updateGlobal(keyPath, data, merge))
      },
      menuMethods: {
      }
    }
  }
}

let FrameSmart = connect(
  mapStateToProps, mapDispatchToProps
)(FrameDumb)

export default FrameSmart
