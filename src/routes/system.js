import React from 'react'
import { Route, Switch } from 'react-router'
import loadableComponent from './loadableComponent'

const NotFoundPage = () => import('pages/system/NotFound')
const UpdatePage = () => import('pages/system/Update')

const SystemRoute = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/notfound`} component={loadableComponent(NotFoundPage)} />
    <Route path={`${match.url}/update`} component={loadableComponent(UpdatePage)} />
  </Switch>
)

export default SystemRoute
