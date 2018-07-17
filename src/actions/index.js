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
  FETCH_CITIES_FAILURE
} from "./type";

export const fetchEvents = (pais, ciudad, categoria, nombre) => ({
  type: FETCH_EVENTS,
  payload: { pais, ciudad, categoria, nombre }
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

export const fetchCities = (country) => ({ type: FETCH_CITIES });
export const fetchCitiesSuccess = cities => ({ type: FETCH_CITIES_SUCCESS,
  payload: { cities }
});
export const fetchCitiesFailure = error => ({
  type: FETCH_CITIES_FAILURE,
  payload: {error}
})

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
