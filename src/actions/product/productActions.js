import {createAction} from 'redux-actions'
import * as T from '../actionConstants'
// import ProductService from 'services/productService'
import _ from 'lodash'
import axios from 'axios'

/*
* 获取商品列表
*/
export let productGet = createAction(T.PRODUCT_GET,
  (options = {}) => {
    return axios.get('/api/v0.1/products?_sort=hot&_order=DESC', options)
    .then(
      message => {
        let response = {
          entities: {
            productList: _.mapKeys(message.data, 'id')
          },
          results: {
            total: message.count,
            ids: _.map(message.data, 'id')
          }
        }
        return response
      })
  }
)

/*
* 获取detail数据
*/
export let productDetailGet = createAction(T.PRODUCT_DETAIL_GET,
  (options = {}) => {
    const { id = 0 } = options
    return axios.get(`/api/v0.1/products/${id}`)
    .then(
      message => {
        let objects = []
        objects[message.data.id] = message.data
        let response = {
          entities: {
            product: objects
          },
          results: {
            id: message.data.id
          }
        }
        return response
      })
  }
)

/*
* 获取我的订单
*/
export let myOrderGet = createAction(T.MY_ORDER_GET,
  (options = {}) => {
    return axios.get('/api/v0.1/myOrder?_sort=orderDate&_order=DESC', options)
    .then(
      message => {
        let response = {
          entities: {
            productList: _.mapKeys(message.data, 'id')
          },
          results: {
            total: message.count,
            ids: _.map(message.data, 'id')
          }
        }
        return response
      })
  }
)

/*
* 添加订单
*/
export let orderAdd = createAction(T.ORDER_ADD,
  (options = {}) => axios.post('/api/v0.1/myOrder', options.newOrder)
  .then(
    message => {
      // 更新热度
      axios.put(`/api/v0.1/products/${options.product.id}`, options.product)
    })
)
