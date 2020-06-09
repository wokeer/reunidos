import * as Actions from "../actions"

const initialState = {
  loading: false,
}

const platesReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.LOADING_ORDERS:
    {
        return {
            ...state,
            loading: !state.loading,
        };
    }
    default:
      return state
  }
}

export default platesReducer
