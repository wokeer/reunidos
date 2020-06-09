import {combineReducers} from 'redux';

import users from './users.reducer';
import message from './message.reducer';
import register from './register.reducer';
import branchOff from './branchOff.reducer';
import customer from './customer.reducer';
import plates from './plate.reducer';
import orders from './orders.reducer';

const reducer = combineReducers({
    users,
    message,
    register,
    branchOff,
    customer,
    plates,
    orders,
});

export default reducer;