/**
 * Created by xwf in 2017.09.23.
 * 外卖配送表单
 */
import React, {Component, PropTypes} from 'react'
import styles from './index.css'
import StrUtils from 'utils/strUtils'
import {push} from 'react-router-redux/lib/actions'
import {connect} from 'react-redux'

const TIP = {
  TITLE: '商品名称',
  DESCRIPTION: '商品描述',
  PRICE: '价格',
  NUMBER: '数量',
  NAME: '姓名',
  PHONE: '电话',
  ADDRESS: '地址',
  REQUIRE: '特殊要求'
}

@connect(state => {
  return {
  }
}, {
  push
})

export default class Buy extends Component {
  constructor(props) {
    super(props)
    this.state = {
      number: 0,
      name: '',
      phone: '',
      address: '',
      requires: '',
      tip: '',
      total: 0
    }
    this._openMenu = this.openMenu.bind(this)
    this._inputNumber = this.inputNumber.bind(this)
    this._changeInput = this.changeInput.bind(this)
    this._confiremBuy = this.confiremBuy.bind(this)
  }
  componentDidMount() {
    const { id = 0 } = this.props
    this.props.productDetailGet({id: id})
  }

  /**
   * 显示提示消息
   */
  _showTip(tip) {
    this._setState({tip: tip})
    setTimeout(function () {
      //  隐藏提示消息
    }, 1000)
  }

  /**
   * 确认购买
   */
  confiremBuy() {
    let object = this.state
    if (object.number === 0) {
      this._showTip(TIP.NUMBER)
      return null
    }
    if (object.name === '') {
      this._showTip(TIP.NAME)
      return null
    }
    if (object.address === '') {
      this._showTip(TIP.ADDRESS)
      return null
    }
    if (object.phone === '') {
      this._showTip(TIP.PHONE)
      return null
    }
    const { data = {} } = this.props
    const { title = '', description = '' } = data

    data.hot = data.hot + 1
    let message = {
      title,
      description,
      price: this.state.total,
      orderDate: new Date().getTime()
    }
    this.props.orderAdd({newOrder: message, product: data})
    this.props.push(global.location.pathname + `home`)
  }
  /**
   * 修改状态
   */
  _setState(state) {
    this.setState(state)
  }

  /**
   * 输入数量
   */
  inputNumber(e) {
    let value = e.target && e.target.value ? e.target.value : ''
    value = StrUtils.filterSpecial(value)
    const { price = 0 } = this.props.data
    let total = value * price
    this._setState({number: value, total: total})
  }

  /**
   * 输入
   */
  changeInput(e) {
    let value = e.target && e.target.value ? e.target.value : ''
    this._setState({[e.target.name]: value})
  }

  /***
   * 菜单栏
   */
  openMenu() {
  }

  render() {
    const { data = {} } = this.props

    // 商品信息
    const getProduct = (item) => {
      const { title = '', price = 0, description = '' } = item
      return <div className={styles.product}>
        <div className={styles.row}>
          {TIP.TITLE}
          <span className={styles.description} style={{color: '#333'}}>{title}</span>
        </div>
        <div className={styles.row}>
          {TIP.DESCRIPTION}
          <span className={styles.description} style={{color: '#333'}}>{description}</span>
        </div>
        <div className={styles.row}>
          {TIP.PRICE}
          <span className={styles.description} style={{color: '#333'}}>￥{price}.00</span>
        </div>
      </div>
    }
    // 用户信息
    const getUserInfo = () => {
      return <form className={styles.userInfo}>
        <div className={styles.row}>
          {TIP.NUMBER}
          <input type='text' placeholder={`请填写${TIP.NUMBER}`} onChange={this._inputNumber} value={this.state.number} />
        </div>
        <div className={styles.row}>
          {TIP.NAME}
          <input placeholder={`请填写${TIP.NAME}`} name='name' onChange={this._changeInput} value={this.state.name} />
        </div>
        <div className={styles.row}>
          {TIP.PHONE}
          <input placeholder={`请填写${TIP.PHONE}`} name='phone' onChange={this._changeInput} value={this.state.phone} />
        </div>
        <div className={styles.row}>
          {TIP.ADDRESS}
          <input placeholder={`请填写${TIP.ADDRESS}`} name='address' onChange={this._changeInput} value={this.state.address} />
        </div>
        <div className={styles.row}>
          {TIP.REQUIRE}
          <input placeholder={`请填写${TIP.REQUIRE}`} name='requires' onChange={this._changeInput} value={this.state.requires} />
        </div>
      </form>
    }
    return <div>
      {
        getProduct(data)
      }
      {
        getUserInfo()
      }
      {
        this.state.tip !== '' ? <div id='tip' className={styles.tip}>请输入{`${this.state.tip}`} !!!</div> : null
      }
      <div className={styles.total}>
        <div className={styles.totalRight}>
          <span className={styles.totalPrice}>￥{this.state.total}</span>
          <div className={styles.btn} >
            <span onClick={this._confiremBuy}>确认购买</span>
          </div>
        </div>
      </div>
    </div>
  }
}

Buy.displayName = 'Buy'
Buy.propTypes = {
  data: PropTypes.object,
  id: PropTypes.number.isRequired,
  productDetailGet: PropTypes.func,
  orderAdd: PropTypes.func,
  push: PropTypes.func.isRequired
}
