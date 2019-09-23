import { handleActions } from 'redux-actions'
import { createApiReducers } from 'reducers/utils'
import actionTypes from 'consts/activity/poem'

const {
  POEM_GET_USERS_RANKING,
} = actionTypes

const initialState = {
  requestings: {},
  errors: {},
  usersRanking: null,
}

let reducers = {
  ...createApiReducers([
    POEM_GET_USERS_RANKING,
  ]),
  [POEM_GET_USERS_RANKING](state, action) {
    return {
      ...state,
      usersRanking: action.payload.data,
      requestings: {
        ...state.requestings,
        [POEM_GET_USERS_RANKING]: false,
      },
      errors: {
        ...state.errors,
        [POEM_GET_USERS_RANKING]: null,
      },
    }
  },
}
export default handleActions(reducers, initialState)
