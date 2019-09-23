import React from 'react'
import { Route, Switch, Redirect } from 'react-router'

import loadableComponent from './loadableComponent'
import SystemRoute from './system'
import CmsRoute from './cms'

const HomePage = () => import('pages/Home')
const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/" component={loadableComponent(HomePage)} />
      <Route path="/system" component={SystemRoute} />
      {
        CmsRoute && <Route path="/cms" component={CmsRoute} />
      }
      <Redirect to="/" />
    </Switch>
  )
}

export default AppRouter
