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
  FETCH_PLACE,
  FETCH_PLACE_SUCCESS,
  FETCH_PLACE_FAILURE,
  FETCH_USER_EVENT_BIDS_SUCCESS,
  FETCH_USER_EVENT_BIDS_FAILURE,
  FETCH_EVENT_BID,
  INITIAL_FETCH,
  POST_EVENT,
  POST_EVENT_SUCCESS,
  POST_EVENT_FAILURE,
  FETCH_EVENT_BID_SUCCESS,
  FETCH_EVENT_BID_FAILURE,
  FETCH_USER_EVENT_BIDS,
  POST_SPONSOR,
  POST_SPONSOR_FAILURE,
  FETCH_SPONSOR_DETAIL,
  FETCH_SPONSOR_DETAIL_FAILURE,
  FETCH_SPONSOR_DETAIL_SUCCESS,
  FETCH_USER_SPONSORS,
  FETCH_USER_SPONSORS_FAILURE,
  FETCH_USER_SPONSORS_SUCCESS,
  FETCH_CITY_PLACES,
  FETCH_CITY_PLACES_FAILURE,
  FETCH_CITY_PLACES_SUCCESS,
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

export const fetchPlace = placeID => ({
  type: FETCH_PLACE,
  payload: { placeID }
});

export const fetchPlaceSuccess = place => ({
  type: FETCH_PLACE_SUCCESS,
  payload: { place }
});

export const fetchPlaceFailure = err => ({
  type: FETCH_PLACE_FAILURE,
  payload: { err }
});

export const fetchCityPlaces = cityID => ({
  type: FETCH_CITY_PLACES,
  payload: {cityID}
});

export const fetchCityPlacesSuccess = places => ({
  type: FETCH_CITY_PLACES_SUCCESS,
  payload: {places}
});

export const fetchCityPlacesFailure = err => ({
  type: FETCH_CITY_PLACES_FAILURE,
  payload: {err}
});

export const fetchEventBid = (eventID) => ({
  type: FETCH_EVENT_BID,
  payload: { eventID }
});

export const fetchEventBidSuccess = bids => ({
  type: FETCH_EVENT_BID_SUCCESS,
  payload: { bids }
});

export const fetchEventBidFailure = err => ({
  type: FETCH_EVENT_BID_FAILURE,
  payload: { err }
});

export const initialFetch = () => ({
  type: INITIAL_FETCH
});

export const initialFetchFailure = error => ({
  type: INITIAL_FETCH,
  payload: { error }
});

export const postEvent = form => ({
  type: POST_EVENT,
  payload: {form}
});

export const postEventSuccess = () => ({
  type: POST_EVENT_SUCCESS
});

export const postEventFailure = (err) => ({
  type: POST_EVENT_FAILURE,
  payload: {err}
});


export const fetchUserEventBids = (userID) => ({
  type: FETCH_USER_EVENT_BIDS,
  payload: {userID}
})

export const fetchUserEventBidsSuccess = (userEventBids) => ({
  type: FETCH_USER_EVENT_BIDS_SUCCESS,
  payload: {userEventBids}
})

export const fetchUserEventBidsFailure = (err) => ({
  type: FETCH_USER_EVENT_BIDS_FAILURE,
  payload: {err }
})

export const fetchUserSponsors = (userID) => ({
  type: FETCH_USER_SPONSORS,
  payload: {userID}
});

export const fetchUserSponsorsSuccess = (sponsors) => ({
  type: FETCH_USER_SPONSORS_SUCCESS,
  payload: {sponsors}
});

export const fetchUserSponsorsFailure = (err) => ({
  type:FETCH_USER_SPONSORS_FAILURE,
  payload: {err}
});

export const fetchSponsorDetail = (sponsorID, userID) => ({
  type: FETCH_SPONSOR_DETAIL,
  payload: {sponsorID, userID}
});

export const fetchSponsorDetailSuccess = (sponsorDetail) => ({
  type: FETCH_SPONSOR_DETAIL_SUCCESS,
  payload: {sponsorDetail}
});

export const fetchSponsorDetailFailure = (err) => ({
  type: FETCH_SPONSOR_DETAIL_FAILURE,
  payload: {err}
});

export const postSponsor = () => ({
  type: POST_SPONSOR,
  payload: {}
});

export const postSponsorSuccess = () => ({
  type: POST_SPONSOR,
  payload: {}
});

export const postSponsorFailure = (err) => ({
  type: POST_SPONSOR_FAILURE,
  payload: {err}
});
