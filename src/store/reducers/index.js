import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import logo from "./logo";
import events from "./events"

const rootReducer = combineReducers({userReducer,logo,events});

export default rootReducer;
