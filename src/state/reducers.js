import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  FETCH_EVENTS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_PROFILE,
  UNSET_PROFILE,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_CITIES_SUCCESS,
  FECTCH_EVENT_DETAIL_SUCCESS,
  FETCH_EVENT_PLACE_SUCCESS,
  FETCH_EVENT_BID_SUCCESS,
} from "../actions/type";

const events = (state = null, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload.events;
    default:
      return state;
  }
};

const user = (state = null, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.payload.data;
    case LOGOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};

const profile = (state = null, action) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload.user;
    case UNSET_PROFILE:
      return null;
    default:
      return state;
  }
};

export const countries = (state = null, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return action.payload.countries;
    default:
      return state;
  }
};

export const cities = (state = null, action) => {
  switch (action.type) {
    case FETCH_CITIES_SUCCESS:
      return action.payload.cities;
    default:
      return state;
  }
};

export const eventDetail = (state = null, action) => {
  switch (action.type){
    case FECTCH_EVENT_DETAIL_SUCCESS:
      return action.payload.eventDetail;
    default:
      return state;
  }
}

export const place = (state = null, action) => {
  switch(action.type){
    case FETCH_EVENT_PLACE_SUCCESS:
      return action.payload.place;
    default:
      return state;
  }
}

export const eventBids = (state = null, action) => {
  switch(action.type){
    case FETCH_EVENT_BID_SUCCESS:
      return action.payload.bids;
    default:
      return state;
  }
}

export default combineReducers({
  formReducer,
  events,
  user,
  profile,
  countries,
  eventDetail,
});
