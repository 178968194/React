import {connect} from 'react-redux'
import BuyDumb from 'modules/product/buy'
import { productDetailGet, orderAdd } from '../../actions/product/productActions'

const mapStateToProps = state => {
  const { productDetail = {}, global, productMap = [], routing = {} } = state

  const { locationBeforeTransitions = {} } = routing
  const { pathname = '' } = locationBeforeTransitions
  let productId = pathname.split('home/buy/')[1]

  const { id = '' } = productDetail
  let data = productMap[id] || {}

  return {
    data,
    global,
    id: productId
  }
}

const mapDispatchToProps = dispatch => ({
  productDetailGet: payload => dispatch(productDetailGet(payload)),
  orderAdd: payload => dispatch(orderAdd(payload))
})

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...props,
    ...x,
    ...y
  }
})(BuyDumb)
