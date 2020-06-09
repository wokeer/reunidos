import * as Actions from "../actions"

const initialState = {
  loadingAll: false,
  data: {},
  total: 0,
}

const customerReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_LOADING:
    {
        return {
            ...state,
            loadingAll: !state.loadingAll,
        };
    }
    case Actions.GET_ADDRESS: 
    {
        return {
          ...state,
          data: action.payload
        }
    }
    case Actions.SAVE_ADDRESS:
    {
        return {
            ...state,
            data: null,
            loadingAll: !state.loadingAll,
        };
    }
    case Actions.UPDATE_ADDRESS:
    {
        return {
            ...state,
            data: null,
            loadingAll: !state.loadingAll,
        };
    }
    case Actions.UPDATE_PRINCIPAL_ADDRESS:
    {
        return {
            ...state,
            data: null,
            loadingAll: !state.loadingAll,
        };
    }
    case Actions.DELETE_ADDRESS:
    {
        return {
            ...state,
            searchText: ''
        };
    }
    default:
      return state
  }
}

export default customerReducer
