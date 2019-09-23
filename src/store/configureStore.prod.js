import { applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import rootReducer from '../reducers'

const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = preloadedState => init({
  plugins: [loadingPlugin],
  models: {},
  redux: {
    reducers: {
      // root: rootReducer,
      ...rootReducer,
    },
    initialState: preloadedState,
    enhancers: [
      applyMiddleware(thunk),
    ],
  },
})

export default configureStore
