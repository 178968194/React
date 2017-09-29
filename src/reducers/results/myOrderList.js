import {handleActions} from 'redux-actions'
import * as T from '../../actions/actionConstants'

const initialState = {
  loading: true,
  error: false,
  ids: [],
  total: 0,
  finished: false,
  page: 0
}

export const myOrderList = handleActions({
  [`${T.MY_ORDER_GET}_PENDING`](state, action) {
    return {
      ...state,
      loading: true,
      error: false
    }
  },
  [T.MY_ORDER_GET]: {
    next(state, action) {
      // handle success
      const { ids = [], total = 0 } = action.payload.results
      let { page = 0 } = state
      let finished = total === ids.length
      page = finished ? page : page + 1

      return {
        ...state,
        loading: false,
        error: false,
        ids,
        total,
        finished,
        page
      }
    },
    throw(state, action) {
      // handle error
      return {
        ...state,
        loading: false,
        error: true
      }
    }
  }
}, initialState)
