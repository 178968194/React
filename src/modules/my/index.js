/**
 * Created by xwf in 2017.09.23.
 * 我的外卖列表
 */
import React, {Component, PropTypes} from 'react'
import styles from './index.css'
// import { Button } from 'antd'
// import {push} from 'react-router-redux/lib/actions'
import DateUtils from 'utils/dateUtils'

const INIT_PARAMS = {
  page: 0,
  size: 10
}

export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this._openMenu = this.openMenu.bind(this)
    this._buyProduct = this.buyProduct.bind(this)
  }
  componentDidMount() {
    this.props.myOrderGet(INIT_PARAMS)
  }
  /**
   * 购买
   */
  buyProduct(e) {
    let id = e.target && e.target.value ? e.target.value : 0
    this.props.push(global.location.pathname + `home/buy/${id}`)
  }
  /***
   * 菜单栏
   */
  openMenu() {
  }
  render() {
    const { data = {} } = this.props
    // 商品列表
    const getProductList = (list = []) => {
      return list.map(
        item => {
          const { title = '', price = 0, description = '', orderDate = '' } = item
          return <div className={styles.product}>
            <div className={styles.title}>{title}</div>
            <div className={styles.description}>
              <div><span style={{color: '#333'}}>时间：</span>{DateUtils.getDateStr(orderDate)}</div>
              <div><span style={{color: '#333'}}>价格：</span>￥{price}</div>
              <div><span style={{color: '#333'}}>明细：</span>{description}</div>
            </div>
          </div>
        })
    }

    return <div>
      {
        getProductList(data)
      }
    </div>
  }
}

List.displayName = 'List'
List.propTypes = {
  data: PropTypes.object,
  myOrderGet: PropTypes.func,
  push: PropTypes.func.isRequired
}
