import {combineReducers} from 'redux';
import { FETCH_EVENTS, FETCH_EVENTS_SUCCESS } from '../actions/type';

const events = (state = [], action) => {

    switch(action.type){
        case FETCH_EVENTS_SUCCESS:
            return action.payload.events;

        default: return state;
    }

};

export default combineReducers({
    events,

});