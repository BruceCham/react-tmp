import { applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { init } from '@rematch/core'
import createLoadingPlugin from '@rematch/loading'
import rootReducer from '../reducers'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const loadingPlugin = createLoadingPlugin({ asNumber: true })

const configureStore = (preloadedState) => {
  const store = init({
    plugins: [loadingPlugin],
    models: {},
    redux: {
      reducers: {
        ...rootReducer,
      },
      initialState: preloadedState,
      enhancers: [
        composeEnhancers(
          applyMiddleware(thunk, createLogger()),
        ),
      ],
    },
  })

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

export default configureStore
