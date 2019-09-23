import React from 'react'
import { Route, Switch, Redirect } from 'react-router'
import loadableComponent from '../loadableComponent'

const EditJson = () => import('pages/cms/Editor')

const ActivityRoute = ({ match }) => (
  <Switch>
    <Route path={`${match.url}/editor/:id?`} component={loadableComponent(EditJson)} />
    <Redirect to={`${match.url}/editor`} />
  </Switch>
)

export default ActivityRoute