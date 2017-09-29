import React from 'react'
// import { Radio } from 'antd'
import {connect} from 'react-redux'
import {push} from 'react-router-redux/lib/actions'
import styles from './styles/index.css'
// import { Button } from 'antd'

// const RadioButton = Radio.Button
// const RadioGroup = Radio.Group

const REDO_OPTION = {
  my: '我的订单',
  refresh: '刷新'
}

@connect(state => {
  return {
  }
}, {
  push
})

class Nav extends React.Component {
  static propTypes = {
    push: React.PropTypes.func.isRequired
  }
  componentWillMount() {
    this.setState({
      show: false
    })
  }
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      lastLink: '',
      currentLink: ''
    }
    this._openMenu = this.openMenu.bind(this)
    this._showMenu = this.showMenu.bind(this)
    this._preLink = this.preLink.bind(this)
  }

  openMenu(e) {
    this.setState({
      show: false
    })
    let value = e.target && e.target.textContent ? e.target.textContent : ''
    if (value === REDO_OPTION.my) {
      this.props.push(global.location.pathname + 'my')
    } else {
      let currentLocation = window.location.href
      currentLocation = currentLocation.split('#/')[1]
      currentLocation = currentLocation.split('?')[0]
      this.props.push(currentLocation)
    }
  }

  currentLink() {
    let currentLocation = window.location.href
    currentLocation = currentLocation.split('#/')[1]
    currentLocation = currentLocation.split('?')[0]
    this.setState({
      currentLink: currentLocation
    })
  }

  setPreLink() {
    this.setState({
      lastLink: this.currentLink()
    })
  }

  preLink(e) {
    this.setState({
      show: false
    })
    this.props.push(global.location.pathname + `${this.state.lastLink}`)
  }

  showMenu() {
    this.setState({
      show: !this.state.show
    })
  }

  render() {
    let currentLocation = window.location.href
    currentLocation = currentLocation.split('#/')[1]
    currentLocation = currentLocation.split('?')[0]
    switch (currentLocation) {
      case 'home':
      case '':
        currentLocation = '外卖商品列表'
        break
      case 'my':
        currentLocation = '我的外卖列表'
        break
      default:
        currentLocation = '配送表单'
        break
    }
    return (
      <div>
        <div className={styles.arrow} onClick={this._preLink} />
        <div className={styles.head}>
          <div className={styles.headTitle}>{currentLocation}</div>
          <div className={styles.buyBtn} onClick={this._showMenu} />
        </div>
        {
          this.state.show ? <div className={styles.tabMenu}>
            {
              Object.entries(REDO_OPTION).map((entry, index) => {
                let [key, value] = entry
                return <div value={key} key={index} className={styles.tabItem} onClick={this._openMenu}>{value}</div>
              })
            }
          </div> : null
        }
      </div>
    )
  }
}

export default Nav
