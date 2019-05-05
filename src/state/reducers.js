import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
  POST_VALIDATE_ME_SUCCESS,
  FETCH_EVENTS_SUCCESS,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  SET_PROFILE,
  UNSET_PROFILE,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_CITIES_SUCCESS,
  FECTCH_EVENT_DETAIL_SUCCESS,
  FETCH_PLACE_SUCCESS,
  FETCH_EVENT_BID_SUCCESS,
  FETCH_USER_EVENT_BIDS,
  FETCH_USER_EVENT_BIDS_SUCCESS,
  FETCH_USER_SPONSORS_SUCCESS,
  FETCH_SPONSOR_DETAIL_SUCCESS,
  FETCH_CITY_PLACES_SUCCESS,
  FETCH_VALIDATION_REQUESTS,
  FETCH_VALIDATION_REQUESTS_SUCCESS,
  POST_BID_FAILURE,
  CLEAR_ERROR,
  POST_BID_SUCCESS,
  CLEAR_SUCCESS,
  CLEAR_LOADING,
  POST_VALIDATE_ME,
  FETCH_VALIDATION_COMPANY_DETAIL,
  FETCH_VALIDATION_COMPANY_DETAIL_SUCCESS,
  FETCH_VALIDATION_COMPANY_FAILURE,
  SET_LEAFLET_PLACE,
  UNSET_LEAFLET_PLACE,
  POST_SPONSOR_SUCCESS,
  DELETE_SPONSOR_SUCCESS,
  DELETE_SPONSOR_FAILURE,
  FETCH_SPONSORS_TO_VALIDATE_SUCCESS,
  POST_VALIDATE_SPONSOR_FAILURE,
  FETCH_EVENT_WINNERS_SUCCESS,
  FETCH_MY_EVENTS_SUCCESS,
  FETCH_WON_EVENTS_SUCCESS,
  FETCH_MY_EVENTS_FAILURE,
  SET_TICKET,
  FETCH_WON_EVENT_DETAIL_SUCCESS,
  FETCH_VALIDATED_SPONSORS_SUCCESS,
  POST_SPONSOR,
  POST_SPONSOR_FAILURE,
  POST_VALIDATE_ME_FAILURE,
  POST_EVENT,
  POST_EVENT_FAILURE,
  POST_EVENT_SUCCESS,
  POST_VALIDATE_SPONSOR,
  POST_VALIDATE_SPONSOR_SUCCESS,
  POST_VALIDATE_PLACE,
  POST_VALIDATE_PLACE_SUCCESS,
  POST_VALIDATE_PLACE_FAILURE,
  POST_PLACE_FAILURE,
} from "../actions/type";

const ticket = (state = null, action ) => {
  switch(action.type){
    case FETCH_WON_EVENT_DETAIL_SUCCESS:
      return action.payload.ticket;
    default:
      return state;
  }
}

const leafletPlace = (state = null, action) => {
  switch(action.type){
    case SET_LEAFLET_PLACE:
      return action.payload.leafletPlace;
    case UNSET_LEAFLET_PLACE:
      return null;
    default:
      return state;
  }
}

const eventWinners = (state =null, action) => {
  switch(action.type){
    case FETCH_EVENT_WINNERS_SUCCESS:
      return action.payload.winners;
    default:
      return state;
  }
}

const companyValidationRequests = (state = null, action) => {
  switch(action.type) {
    case FETCH_VALIDATION_REQUESTS_SUCCESS:
      return action.payload.requests;
    default:
      return state;
  }
}

const validationCompanyDetail = (state = null, action) => {
  switch(action.type){
    case FETCH_VALIDATION_COMPANY_DETAIL_SUCCESS:
      return action.payload.detail;
    default:
      return state;
  }
}

const events = (state = null, action) => {
  switch (action.type) {
    case FETCH_EVENTS_SUCCESS:
      return action.payload.events;
    case FETCH_MY_EVENTS_SUCCESS:
      return action.payload.events;
    case FETCH_WON_EVENTS_SUCCESS:
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
      return action.payload.profile;
    case UNSET_PROFILE:
      return null;
    default:
      return state;
  }
};

const countries = (state = null, action) => {
  switch (action.type) {
    case FETCH_COUNTRIES_SUCCESS:
      return action.payload.countries;
    default:
      return state;
  }
};

const cities = (state = null, action) => {
  switch (action.type) {
    case FETCH_CITIES_SUCCESS:
      return action.payload.cities;
    default:
      return state;
  }
};

const eventDetail = (state = null, action) => {
  switch (action.type) {
    case FECTCH_EVENT_DETAIL_SUCCESS:
      return action.payload.eventDetail;
    default:
      return state;
  }
};

const cityPlaces = (state = null, action) => {
  switch (action.type) {
    case FETCH_CITY_PLACES_SUCCESS:
      return action.payload.places;
    default:
      return state;
  }
};

const place = (state = null, action) => {
  switch (action.type) {
    case FETCH_PLACE_SUCCESS:
      return action.payload.place;
    default:
      return state;
  }
};

const eventBids = (state = null, action) => {
  switch (action.type) {
    case FETCH_EVENT_BID_SUCCESS:
      return action.payload.bids;
    default:
      return state;
  }
};

const userEventBids = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_EVENT_BIDS_SUCCESS:
      return action.payload.userEventBids;
    default:
      return state;
  }
};

const listSponsors = (state = null, action) => {
  switch (action.type) {
    case FETCH_USER_SPONSORS_SUCCESS:
      return action.payload.sponsors;
    case FETCH_SPONSORS_TO_VALIDATE_SUCCESS:
      return action.payload.sponsors;
    case FETCH_VALIDATED_SPONSORS_SUCCESS:
      return action.payload.sponsors;
    default:
      return state;
  }
};

const sponsorDetail = (state = null, action) => {
  switch (action.type) {
    case FETCH_SPONSOR_DETAIL_SUCCESS:
      return action.payload.sponsorDetail;
    default:
      return state;
  }
};

const error = (state = null, action) => {
  switch (action.type) {
    case POST_BID_FAILURE:
      return action.payload.e;
    case CLEAR_ERROR:
      return null;
    case DELETE_SPONSOR_FAILURE:
      return action.payload.e;
    case POST_VALIDATE_SPONSOR_FAILURE:
      return action.payload.e;
    case FETCH_MY_EVENTS_FAILURE:
      return action.payload.e;
    case POST_PLACE_FAILURE:
      return action.payload.e;
    default:
      return state;
  }
};

const successInitialState = {
  data: null,
  type: null,
  redirect: null,
};


const success = (state = successInitialState, action) => {
  let redirect = null;
  switch (action.type) {
    case POST_BID_SUCCESS:
      const { participaciones, cantidad } = action.payload;
      return { data: { participaciones, cantidad }, type: "bid"};
    case CLEAR_SUCCESS:
      return successInitialState;
    case POST_VALIDATE_ME_SUCCESS:
        redirect  = action.payload.redirect; 
      return {data : {redirect} , type: "postValidate"}
    case POST_SPONSOR_SUCCESS:
        redirect  = action.payload.redirect;
      return {data: {redirect} , type: "postSponsor"}
    case POST_VALIDATE_SPONSOR_SUCCESS:
      redirect = action.payload.redirect;
      return {data: {redirect} , type: "validateSponsor"}
    case DELETE_SPONSOR_SUCCESS:
      redirect = action.payload.redirect;
      return {data: {redirect} , type: "deleteSponsor"}
    case POST_VALIDATE_PLACE_SUCCESS:
      redirect = action.payload.redirect;
      return {data: {redirect}, type: "postplace"}
      
    default:
      return state;
  }
};

const loading = (state = {status: false}, action) =>{
  switch (action.type){

    case POST_SPONSOR:
      return {status: true};
    case POST_SPONSOR_SUCCESS:
      return {status: false};
    case POST_SPONSOR_FAILURE:
      return {status: false};

    case POST_VALIDATE_ME:
      return {status: true};
    case POST_VALIDATE_ME_SUCCESS:
      return {status: false};
    case POST_VALIDATE_ME_FAILURE:
      return {status: false};

    case POST_VALIDATE_SPONSOR:
      return {status: true};
    case POST_VALIDATE_SPONSOR_SUCCESS:
      return {status: false};
    case POST_VALIDATE_SPONSOR_FAILURE:
      return {status: false};

    case POST_VALIDATE_PLACE:
      return {status: true};
    case POST_VALIDATE_PLACE_SUCCESS:
      return {status: false};
    case POST_VALIDATE_PLACE_FAILURE:
      return {status: false};
      
    case POST_EVENT:
      return {status: true};
    case POST_EVENT_FAILURE:
      return {status: false};
    case POST_EVENT_SUCCESS:
      return {status: false};

    default:
      return state;
  }
}

export default combineReducers({
  form: formReducer,
  events,
  user,
  profile,
  countries,
  eventDetail,
  cities,
  eventBids,
  place,
  userEventBids,
  listSponsors,
  sponsorDetail,
  cityPlaces,
  error,
  success,
  companyValidationRequests,
  validationCompanyDetail,
  leafletPlace,
  eventWinners,
  ticket,
  loading,
});
