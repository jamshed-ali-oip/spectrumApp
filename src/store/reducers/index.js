import {combineReducers} from 'redux';
import {userReducer} from './userReducer';
import logo from "./logo";
import events from "./events"
import videoRed from './videoRed';

const rootReducer = combineReducers({userReducer,logo,events,videoRed});

export default rootReducer;
