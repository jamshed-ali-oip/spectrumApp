import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import logo from "./logo";

const rootReducer = combineReducers({userReducer,logo});

export default rootReducer;
