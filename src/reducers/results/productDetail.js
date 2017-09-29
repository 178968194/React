import {handleActions} from 'redux-actions'
import * as T from '../../actions/actionConstants'

const initialState = {
  loading: true,
  error: false,
  id: '',
  total: 0
}

export const productDetail = handleActions({
  [`${T.PRODUCT_DETAIL_GET}_PENDING`](state, action) {
    return {
      ...state,
      loading: true,
      error: false
    }
  },
  [T.PRODUCT_DETAIL_GET]: {
    next(state, action) {
      // handle success
      const { id = '' } = action.payload.results
      return {
        ...state,
        loading: false,
        error: false,
        id
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
