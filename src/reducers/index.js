import global from './global'
import { productList } from './results/productList'
import { productDetail } from './results/productDetail'
import { myOrderList } from './results/myOrderList'
import { productMap } from './entities/product'

export function globalSelector(state) {
  return state.global
}

export default {
  global,
  productList,
  productDetail,
  myOrderList,
  productMap
}
