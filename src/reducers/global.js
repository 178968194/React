// import { updateKeyPathData } from 'utils/immutableUtils'
// import _ from 'lodash'
import { initGlobalState } from '../constants/structure.default'
// import * as actionConstants from '../actions/actionConstants'
import Immutable from 'immutable'

const initState = Immutable.fromJS(initGlobalState)

function global(state = initState, action) {
  // let response = action.response
  // let payload = action.payload
  switch (action.type) {
    // 全局控制变量
    // 加载
    // 更新flags.node
    default:
      return state
  }
}

export default global
