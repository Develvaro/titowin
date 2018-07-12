import {combineReducers} from 'redux';
import { FETCH_EVENTS_SUCCESS,
     LOGIN_SUCCESS, LOGOUT_SUCCESS
} from '../actions/type';

const events = (state = null, action) => {
    switch(action.type){
        case FETCH_EVENTS_SUCCESS:
            return action.payload.events;
        default: return state;
    }
};

const user = (state = null, action) => {
    switch(action.type)
    {
        case LOGIN_SUCCESS:
            return action.payload.data;
        case LOGOUT_SUCCESS:
            return null;
            
        default: return state;
    }
}

export default combineReducers({
    events,
    user,
});