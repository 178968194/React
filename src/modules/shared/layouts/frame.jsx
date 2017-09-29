import React from 'react'
import styles from './styles/index.css'
import Nav from './nav'

class Frame extends React.Component {
  static propTypes = {
    children: React.PropTypes.element
  }

  render() {
    return (
      <div className={styles.frame}>
        <div className={`${styles['container']}`}>
          <Nav />
          <div className={styles.productContainer}>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default Frame
