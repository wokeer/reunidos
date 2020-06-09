import * as Actions from "../actions"

const initialState = {
  data: [],
  dataBranch: [],
  total: 0,
}

const branchOffReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_BRANCH_OFFICE_ID: {
      return {
        ...state,
        data: action.payload
      }
    }
    case Actions.GET_BRANCH_OFFICE_RESTAURANT_ID: {
      return {
        ...state,
        dataBranch: action.payload
      }
    }
    default:
      return state
  }
}

export default branchOffReducer
