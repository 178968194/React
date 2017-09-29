import {connect} from 'react-redux'
import ProductListDumb from 'modules/product/index'
import { productGet } from '../../actions/product/productActions'

const mapStateToProps = state => {
  const { productList = {}, global, productMap = [] } = state
  let data = []
  productList && productList.ids.map(
    item => {
      let object = productMap[item] || {}
      data.push(object)
    })
  return {
    data,
    global
  }
}

const mapDispatchToProps = dispatch => ({
  productGet: payload => dispatch(productGet(payload))
})

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...props,
    ...x,
    ...y
  }
})(ProductListDumb)
