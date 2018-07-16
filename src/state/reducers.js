import {combineReducers} from 'redux';
import { FETCH_EVENTS_SUCCESS,
     LOGIN_SUCCESS, LOGOUT_SUCCESS,
     SET_PROFILE, UNSET_PROFILE
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
            return null
        default: return state;
    }
}

const profile = (state = null, action) => {
    switch(action.type)
    {
        case SET_PROFILE:
            return action.payload.data;
        case UNSET_PROFILE:
            return null
        default: return state;
    }
}


export default combineReducers({
    events,
    user,
    profile,
});