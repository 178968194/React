import React from 'react'
import {Router, Route, IndexRoute} from 'react-router'
import Frame from 'modules/shared/layouts/frame'
import Intl from 'i18n/intl'

const ProductList = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('containers/product/index'))
  }, 'ProductList')
}

const ProductBuy = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('containers/product/buy'))
  }, 'ProductBuy')
}

const MyOrder = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('containers/my/index'))
  }, 'MyOrder')
}

const routes = history => (
  <Router history={history}>
    <Route component={Intl}>
      <Route path='/' component={Frame}>
        <IndexRoute getComponent={ProductList} />
        <Route path='home' getComponent={ProductList} />
        <Route path='my' getComponent={MyOrder} />
        <Route path='home/buy/:id' getComponent={ProductBuy} />
      </Route>
    </Route>
  </Router>
)

export default routes
