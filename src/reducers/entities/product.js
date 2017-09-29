import {handleActions} from 'redux-actions'
import * as T from '../../actions/actionConstants'

const initialState = {}
export const productMap = handleActions({
  // [`${T.ARTICLE_DETAIL_GET}_PENDING`](state, action) {
  //   return {
  //     ...state
  //   }
  // },
  // [T.ARTICLE_DETAIL_GET]: {
  //   next(state, action) {
  //     // handle success
  //     const { product = [] } = action.payload
  //     return Object.assign({}, state, product)
  //   },
  //   throw(state, action) {
  //     // handle error
  //     return {
  //       ...state
  //     }
  //   }
  // },
  [`${T.PRODUCT_GET}_PENDING`](state, action) {
    return {
      ...state
    }
  },
  [T.PRODUCT_GET]: {
    next(state, action) {
      // handle success\
      const { productList = [] } = action.payload.entities
      return Object.assign({}, state, productList)
    },
    throw(state, action) {
      // handle error
      return {
        ...state
      }
    }
  },
  [`${T.PRODUCT_DETAIL_GET}_PENDING`](state, action) {
    return {
      ...state
    }
  },
  [T.PRODUCT_DETAIL_GET]: {
    next(state, action) {
      // handle success\
      const { product = [] } = action.payload.entities
      return Object.assign({}, state, product)
    },
    throw(state, action) {
      // handle error
      return {
        ...state
      }
    }
  },
  [`${T.MY_ORDER_GET}_PENDING`](state, action) {
    return {
      ...state
    }
  },
  [T.MY_ORDER_GET]: {
    next(state, action) {
      // handle success\
      const { productList = [] } = action.payload.entities
      return Object.assign({}, state, productList)
    },
    throw(state, action) {
      // handle error
      return {
        ...state
      }
    }
  }
}, initialState)
