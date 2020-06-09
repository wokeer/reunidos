import * as Actions from '../actions'

const initialState = {
    loading: false,
    data: [],
};

const registerReducer = function (state = initialState, action) {
 
    switch (action.type)
    {
        case Actions.GET_CITY_LOADING:
            {
                return {
                    ...state,
                    loading: !state.loading,
                };
            }
        case Actions.GET_CITY_DATA:
            {
                return {
                    ...state,
                    data: action.payload,
                };
            }
        default: 
           return state;
    };
}

export default registerReducer;