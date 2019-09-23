import '@babel/polyfill'
import './publicPath'
import React from 'react'
import { render } from 'react-dom'
import 'common/reset.styl'
import { isDevEnv, enableVConsole, isTestEnv } from 'common/service/util'
import Root from './containers/Root'
import store from './store/index'

const rootDom = document.getElementById('root')
rootDom.style.height = '100%';

if (typeof window.entryUrl === 'undefined' || window.entryUrl === '') {
  [window.cicpEntryUrl] = window.location.href.split('#')
}

if ((isDevEnv() || isTestEnv()) && typeof window.VConsole === 'function') {
  enableVConsole()
}

render(
  <Root store={store} />,
  rootDom,
)
