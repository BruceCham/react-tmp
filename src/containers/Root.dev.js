import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import { hot } from 'react-hot-loader'

import AppRouter from '../routes/index'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
}

export default hot(module)(Root)
