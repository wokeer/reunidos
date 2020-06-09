import * as Actions from "../actions"

const initialState = {
  loading: false,
  dataAll: [],
  data: [],
  dataCate: [],
  total: 0,
  loadingPlate: false,
}

const platesReducer = function(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_PLATE_LOADING:
    {
        return {
            ...state,
            loading: !state.loading,
        };
    }
    case Actions.GET_PLATE_ALL: {
      return {
        ...state,
        dataAll: action.payload,
        loading: !state.loading,
        // total: action.payload.count
      }
    }
    case Actions.GET_PLATE_ID: {
      return {
        ...state,
        data: action.payload
      }
    }
    case Actions.GET_PLATE_CATEGORY_ID: {
      return {
        ...state,
        dataCate: action.payload
      }
    }
    case Actions.LOADING_PLATE: {
      return {
        ...state,
        loadingPlate: !state.loadingPlate,
      }
    }
    default:
      return state
  }
}

export default platesReducer
