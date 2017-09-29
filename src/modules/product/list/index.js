/**
 * Created by xwf in 2017.09.23.
 * 外卖商品列表
 */
import React, {Component, PropTypes} from 'react'
import styles from './index.css'
import { Button } from 'antd'
import * as Image from 'static/resource/exportImage.js'
// import {push} from 'react-router-redux/lib/actions'

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
    this.props.productGet(INIT_PARAMS)
  }
  /**
   * 购买
   */
  buyProduct(e) {
    let id = e.target && e.target.value ? e.target.value : 0
    this.props.push(`home/buy/${id}`)
  }
  /***
   * 菜单栏
   */
  openMenu() {
  }
  render() {
    const { data = {} } = this.props
    // 商品图片
    const getImage = (data) => {
      return <img src={Image[`Prduct${data}`]} />
    }
    // 商品列表
    const getProductList = (list = []) => {
      return list.map(
        item => {
          const { title = '', price = 0, description = '', num = 0, image = '', id = 0 } = item
          return <div className={styles.product}>
            <div className={styles.image}>
              {getImage(image)}
            </div>
            <div className={styles.description}>
              <div className={styles.number}>{num}</div>
              <span className={styles.title}>{title}</span>
              <span className={styles.info}>{description}</span>
              <div className={styles.price}>￥{price}</div>
              {
                num > 0 ? <div className={styles.buyBtn}>
                  <Button onClick={this._buyProduct} value={id}>购买</Button>
                </div> : null
              }
            </div>
          </div>
        })
    }

    return <div className={styles.productContent}>
      {
        getProductList(data)
      }
    </div>
  }
}

List.displayName = 'List'
List.propTypes = {
  data: PropTypes.object,
  productGet: PropTypes.func,
  push: PropTypes.func.isRequired
}
