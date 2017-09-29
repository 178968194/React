import {connect} from 'react-redux'
import MyOrderDumb from 'modules/my/index'
import { myOrderGet } from '../../actions/product/productActions'

const mapStateToProps = state => {
  const { myOrderList = {}, global, productMap = [] } = state
  let data = []
  myOrderList && myOrderList.ids.map(
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
  myOrderGet: payload => dispatch(myOrderGet(payload))
})

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...props,
    ...x,
    ...y
  }
})(MyOrderDumb)
