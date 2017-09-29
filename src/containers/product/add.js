import {connect} from 'react-redux'
import ArtileAddDumb from 'modules/example/add'
import {articleAdd} from '../../actions/product/productActions'

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => ({
  articleAdd: payload => dispatch(articleAdd(payload))
})

export default connect(mapStateToProps, mapDispatchToProps, (x, y, props) => {
  return {
    ...x,
    ...y
  }
})(ArtileAddDumb)
