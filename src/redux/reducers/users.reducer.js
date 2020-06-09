import * as Actions from '../actions'

const initialState = {
    loading: false,
    loadingSendCode: false,
    user: {},
};

const usersReducer = function (state = initialState, action) {
 
    switch (action.type)
    {
        case Actions.GET_USER_LOADING:
            {
                return {
                    ...state,
                    loading: !state.loading,
                };
            }
        case Actions.GET_USER_DATA:
            {
                return {
                    ...state,
                    user: action.payload,
                };
            }
        case Actions.USER_LOADING_SEND_CODE:
            {
                return {
                    ...state,
                    loadingSendCode: !state.loadingSendCode,
                };
            }
        default: 
           return state;
    };
}

export default usersReducer;