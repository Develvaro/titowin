import {
  FETCH_EVENTS,
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_SUCCESS,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  FETCH_PROFILE,
  SET_PROFILE,
  UNSET_PROFILE,
  FETCH_COUNTRIES,
  FETCH_COUNTRIES_SUCCESS,
  FETCH_COUNTRIES_FAILURE,
  FETCH_CITIES,
  FETCH_CITIES_SUCCESS,
  FETCH_CITIES_FAILURE,
  FECTCH_EVENT_DETAIL,
  FECTCH_EVENT_DETAIL_SUCCESS,
  FECTCH_EVENT_DETAIL_FAILURE,
  FETCH_EVENT_PLACE,
  FETCH_EVENT_PLACE_SUCCESS,
  FETCH_EVENT_PLACE_FAILURE,
  FETCH_USER_BIDS_SUCCESS,
  FETCH_USER_BIDS_FAILURE,
  FETCH_EVENT_BID,
  INITIAL_FETCH
} from "./type";

export const fetchEvents = (pais, ciudad) => ({
  type: FETCH_EVENTS,
  payload: { pais, ciudad }
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export const fetchEventsFailure = error => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { error }
});

export const fetchCountries = () => ({ type: FETCH_COUNTRIES });
export const fetchCountriesSuccess = countries => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: { countries }
});
export const fetchCountriesFailure = error => ({
  type: FETCH_COUNTRIES_FAILURE,
  payload: { error }
});

export const fetchCities = country => ({
  type: FETCH_CITIES,
  payload: { country }
});

export const fetchCitiesSuccess = cities => ({
  type: FETCH_CITIES_SUCCESS,
  payload: { cities }
});

export const fetchCitiesFailure = error => ({
  type: FETCH_CITIES_FAILURE,
  payload: { error }
});

export const login = () => ({ type: LOGIN });

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: { data }
});

export const loginFailure = err => ({
  type: LOGIN_FAILURE,
  payload: { err }
});

export const logout = () => ({ type: LOGOUT });

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const logoutFailure = err => ({
  type: LOGOUT_FAILURE,
  payload: { err }
});

export const fetchProfile = user => ({
  type: FETCH_PROFILE,
  payload: { user }
});

export const setProfile = user => ({
  type: SET_PROFILE,
  payload: { user }
});

export const unSetProfile = () => ({ type: UNSET_PROFILE });

export const fetchEventDetail = eventID => ({
  type: FECTCH_EVENT_DETAIL,
  payload: { eventID }
});

export const fetchEventDetailSuccess = eventDetail => ({
  type: FECTCH_EVENT_DETAIL_SUCCESS,
  payload: { eventDetail }
});

export const fetchEventDetailFailure = err => ({
  type: FECTCH_EVENT_DETAIL_FAILURE,
  payload: { err }
});

export const fetchEventPlace = eventID => ({
  type: FETCH_EVENT_PLACE,
  payload: { eventID }
});

export const fetchEventPlaceSuccess = place => ({
  type: FETCH_EVENT_PLACE_SUCCESS,
  payload: { place }
});

export const fetchEventFailure = err => ({
  type: FETCH_EVENT_PLACE_FAILURE,
  payload: { err }
});

export const fetchEventBid = (eventID, participaciones) => ({
  type: FETCH_EVENT_BID,
  payload: { eventID, participaciones }
});

export const fetchEventBidSuccess = bids => ({
  type: FETCH_USER_BIDS_SUCCESS,
  payload: { bids }
});

export const fetchEventBidFailure = err => ({
  type: FETCH_USER_BIDS_FAILURE,
  payload: { err }
});

export const initialFetch = () => ({
  type: INITIAL_FETCH
});

export const initialFetchFailure = error => ({
  type: INITIAL_FETCH,
  payload: { error }
});
