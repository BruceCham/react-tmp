export function createApiReducers(actionTypes = []) {
  return actionTypes.reduce((previous, current) => ({
    ...previous,
    [`${current}_request`](state) {
      return {
        ...state,
        requestings: { ...state.requestings, [current]: true },
        errors: { ...state.errors, [current]: null },
      }
    },
    [current](state, action) {
      return {
        ...state,
        requestings: { ...state.requestings, [current]: false },
        errors: { ...state.errors, [current]: null },
        payloads: {
          ...state.payloads,
          [current]: {
            params: action.params,
            payload: action.payload,
          },
        },
      }
    },
    [`${current}_failure`](state, action) {
      return {
        ...state,
        requestings: { ...state.requestings, [current]: false },
        errors: { ...state.errors, [current]: action.payload },
      }
    },
  }), {})
}

export default createApiReducers
