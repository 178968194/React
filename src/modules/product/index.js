import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'
import List from './list/index'
import {push} from 'react-router-redux/lib/actions'

@connect(state => {
  return {
  }
}, {
  push
})
export default class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menu: ''
    }
    this._onRedoChange = this.onRedoChange.bind(this)
    this._handleNavigate = this.handleNavigate.bind(this)
  }

  onRedoChange(event) {
    let menu = event.target && event.target.value && event.target.value === 'home' ? '' : event.target.value
    this.setState({
      menu
    })
    this.props.push(global.location.pathname + `home/${menu}`)
  }

  handleNavigate(e) {
    e.preventDefault()

    // 使用 react-router-redux 提供的方法跳转，以便更新对应的 store
    this.props.push(global.location.pathname + 'add')
  }

  render() {
    const { articleGet, articleGetByMe, data = {} } = this.props
    return (
      <div>
        <List {...this.props}
          data={data}
          articleGet={articleGet}
          articleGetByMe={articleGetByMe}
        />
      </div>
    )
  }
}

Index.displayName = 'Index'
Index.propTypes = {
  data: PropTypes.object,
  articleGet: PropTypes.func.isRequired,
  articleGetByMe: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired
}
