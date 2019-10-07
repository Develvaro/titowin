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
  POST_BID,
  POST_BID_SUCCESS,
  POST_BID_FAILURE,
  CLEAR_ERROR,
  CLEAR_SUCCESS,
  POST_VALIDATE_ME,
  POST_VALIDATE_ME_SUCCESS,
  POST_VALIDATE_ME_FAILURE,
  FETCH_VALIDATION_REQUESTS,
  FETCH_VALIDATION_REQUESTS_SUCCESS,
  FETCH_VALIDATION_REQUESTS_FAILURE,
  POST_VALIDATE_COMPANY_SUCCESS,
  POST_VALIDATE_COMPANY_FAILURE,
  POST_VALIDATE_COMPANY,
  FETCH_VALIDATION_COMPANY_DETAIL,
  FETCH_VALIDATION_COMPANY_DETAIL_FAILURE,
  FETCH_VALIDATION_COMPANY_DETAIL_SUCCESS,
  SET_LEAFLET_PLACE,
  UNSET_LEAFLET_PLACE,
  POST_PLACE,
  POST_PLACE_FAILURE,
  POST_PLACE_SUCCESS,
  POST_VALIDATE_PLACE,
  POST_VALIDATE_PLACE_SUCCESS,
  POST_VALIDATE_PLACE_FAILURE,
  POST_VALIDATE_SPONSOR,
  POST_VALIDATE_SPONSOR_SUCCESS,
  POST_VALIDATE_SPONSOR_FAILURE,
  POST_SPONSOR_SUCCESS,
  DELETE_SPONSOR,
  DELETE_SPONSOR_FAILURE,
  DELETE_SPONSOR_SUCCESS,
  FETCH_SPONSORS_TO_VALIDATE,
  FETCH_SPONSORS_TO_VALIDATE_SUCCESS,
  FETCH_SPONSORS_TO_VALIDATE_FAILURE,
  SET_EVENT_WINNERS,
  SET_EVENT_WINNERS_FAILURE,
  SET_EVENT_WINNERS_SUCCESS,
  FETCH_EVENT_WINNERS,
  FETCH_EVENT_WINNERS_FAILURE,
  FETCH_EVENT_WINNERS_SUCCESS,
  FETCH_MY_EVENTS,
  FETCH_MY_EVENTS_FAILURE,
  FETCH_MY_EVENTS_SUCCESS,
  FETCH_WON_EVENTS,
  FETCH_WON_EVENTS_FAILURE,
  FETCH_WON_EVENTS_SUCCESS,
  FETCH_WON_EVENT_DETAIL,
  FETCH_WON_EVENT_DETAIL_FAILURE,
  FETCH_WON_EVENT_DETAIL_SUCCESS,
  FETCH_VALIDATED_SPONSORS,
  FETCH_VALIDATED_SPONSORS_FAILURE,
  FETCH_VALIDATED_SPONSORS_SUCCESS,
  POST_EVENT_SPONSOR,
  POST_EVENT_SPONSOR_SUCCESS,
  POST_EVENT_SPONSOR_FAILURE,
  SET_EVENT_PAID,
  SET_EVENT_PAID_FAILURE,
  SET_EVENT_PAID_SUCCESS,
  CLEAR_LOADING,
  FETCH_EVENT_PRIZES,
  FETCH_EVENT_PRIZES_SUCCESS,
  FETCH_EVENT_PRIZES_FAILURE,
  POST_EVENT_PRIZE,
  POST_EVENT_PRIZE_SUCCESS,
  POST_EVENT_PRIZE_FAILURE,
  DELETE_EVENT_PRIZE,
  DELETE_EVENT_PRIZE_SUCCESS,
  DELETE_EVENT_PRIZE_FAILURE,
  SET_EVENT_PRIZES,
  SET_EVENT_PRIZES_SUCCESS,
  SET_EVENT_PRIZES_FAILURE,
  POST_EVENT_DRAW_WINNERS,
  POST_EVENT_DRAW_WINNERS_SUCCESS,
  POST_EVENT_DRAW_WINNERS_FAILURE,
} from "./type";


export const postEventDrawWinners = (eventID) =>({
  type: POST_EVENT_DRAW_WINNERS,
  payload: {eventID}
})

export const postEventDrawWinnersSuccess = () =>({
  type: POST_EVENT_DRAW_WINNERS_SUCCESS,
})

export const postEventDrawWinnersFailure = (e) =>({
  type: POST_EVENT_DRAW_WINNERS_FAILURE,
  payload: {e}
})

export const postEventPrize = (data) => ({
  type: POST_EVENT_PRIZE,
  payload: {data},
})

export const postEventPrizeSuccess = () => ({
  type: POST_EVENT_PRIZE_SUCCESS,
})

export const postEventPrizeFailure = (e) => ({
  type: POST_EVENT_PRIZE_FAILURE,
  payload: {e},
})

export const deleteEventPrize = (idEvent, idPrize) => ({
  type: DELETE_EVENT_PRIZE,
  payload: {idEvent, idPrize},
})

export const deleteEventPrizeSuccess = () => ({
  type: DELETE_EVENT_PRIZE_SUCCESS,
})

export const deleteEventPrizeFailure = (e) => ({
  type: DELETE_EVENT_PRIZE_FAILURE,
  payload: {e},
})

export const setEventPrizes = (idEvent) => ({
  type: SET_EVENT_PRIZES,
  payload: {idEvent},
})

export const setEventPrizesSuccess = () => ({
  type: SET_EVENT_PRIZES_SUCCESS,
})

export const setEventPrizesFailure = (e) => ({
  type: SET_EVENT_PRIZES_FAILURE,
  payload: {e}
})




export const fetchEventPrizes = (idEvent) => ({
  type: FETCH_EVENT_PRIZES,
  payload: {idEvent},
});

export const fetchEventPrizesSuccess = (eventPrizes) => ({
  type: FETCH_EVENT_PRIZES_SUCCESS,
  payload: {eventPrizes},
});

export const fetchEventPrizesFailure = (e) => ({
  type: FETCH_EVENT_PRIZES_FAILURE,
  payload: {e}
})

export const postEventSponsor = (ticket, idEvent, idSponsor) => ({
  type: POST_EVENT_SPONSOR,
  payload: {ticket, idEvent, idSponsor},
});

export const postEventSponsorSuccess = (redirect) => ({
  type: POST_EVENT_SPONSOR_SUCCESS,
  payload: {redirect}
});

export const postEventSponsorFailure = (e) => ({
  type: POST_EVENT_SPONSOR_FAILURE,
  payload: {e},
});

export const fetchValidatedSponsors = () => ({
  type: FETCH_VALIDATED_SPONSORS,
  
});

export const fetchValidatedSponsorsSuccess = (sponsors) => ({
  type: FETCH_VALIDATED_SPONSORS_SUCCESS,
  payload: {sponsors},
});

export const fetchValidatedSponsorsFailure = (e) => ({
  type: FETCH_VALIDATED_SPONSORS_FAILURE,
  payload: {e},
});

export const fetchWonEventDetail = (ticket) => ({
  type: FETCH_WON_EVENT_DETAIL,
  payload: {ticket},
});

export const fetchWonEventDetailSuccess = (ticket) => ({
  type: FETCH_WON_EVENT_DETAIL_SUCCESS,
  payload: {ticket},
});

export const fetchWonEventDetailFailure = (e) => ({
  type: FETCH_WON_EVENT_DETAIL_FAILURE,
  payload: {e},
});


export const fetchWonEvents = (id) => ({
  type: FETCH_WON_EVENTS,
  payload: {id},
});

export const fetchWonEventsSuccess = (events) => ({
  type: FETCH_WON_EVENTS_SUCCESS,
  payload: {events},
});

export const fetchWonEventsFailure = (e) => ({
  type: FETCH_WON_EVENTS_FAILURE,
  payload: {e},
});

export const fetchMyEvents = (id) => ({
  type: FETCH_MY_EVENTS,
  payload: {id},
});

export const fetchMyEventsSuccess = (events) => ({
  type: FETCH_MY_EVENTS_SUCCESS,
  payload: {events},
});


export const fetchMyEventsFailure = (e) => ({
  type: FETCH_MY_EVENTS_FAILURE,
  payload: {e},
});


export const fetchEventWinners = (id, ganadores) => ({
  type: FETCH_EVENT_WINNERS,
  payload: {id, ganadores}
});

export const fetchEventWinnersSuccess = (winners) => ({
  type: FETCH_EVENT_WINNERS_SUCCESS,
  payload: {winners}
});

export const fetchEventWinnersFailure = (e) => ({
  type: FETCH_EVENT_WINNERS_FAILURE,
  payload: {e}
});


export const setEventWinners = (id) => ({
  type: SET_EVENT_WINNERS,
  payload: {id}
});

export const setEventWinnersSuccess = (redirect) => ({
  type: SET_EVENT_WINNERS_SUCCESS,
  payload: {redirect}
});

export const setEventWinnersFailure = (e) => ({
  type: SET_EVENT_WINNERS_FAILURE,
  payload: {e}
});

export const fetchSponsorsToValidate = () => ({
  type: FETCH_SPONSORS_TO_VALIDATE,
});

export const fetchSponsorsToValidateSuccess = (sponsors) => ({
  type: FETCH_SPONSORS_TO_VALIDATE_SUCCESS,
  payload: {sponsors}
});

export const fetchSponsorsToValidateFailure = (e) => ({
  type: FETCH_SPONSORS_TO_VALIDATE_FAILURE,
  payload: {e}
});

export const postValidatePlace = (form) => ({
  type: POST_VALIDATE_PLACE,
  payload: {form}
});

export const postValidatePlaceSuccess = (redirect) => ({
  type: POST_VALIDATE_PLACE_SUCCESS,
  payload: {redirect}
});

export const postValidatePlaceFailure = (e) => ({
  type: POST_VALIDATE_PLACE_FAILURE,
  payload: {e}
});

export const postValidateSponsor = (id) => ({
  type: POST_VALIDATE_SPONSOR,
  payload: {id}
});

export const postValidateSponsorSuccess = (redirect) => ({
  type: POST_VALIDATE_SPONSOR_SUCCESS,
  payload: {redirect}
});

export const postValidateSponsorFailure = (e) => ({
  type: POST_VALIDATE_SPONSOR_FAILURE,
  payload: {e}
});


export const postPlace = (data) => ({
  type: POST_PLACE,
  payload: {data}
});

export const postPlaceSuccess = () => ({
  type: POST_PLACE_SUCCESS,
});

export const postPlaceFailure = (e) => ({
  type: POST_PLACE_FAILURE,
  payload: {e}
});
export const setLeafletPlace = (leafletPlace) => ({
  type: SET_LEAFLET_PLACE,
  payload: {leafletPlace}
});

export const unSetLeafletPlace = ()  => ({
  type: UNSET_LEAFLET_PLACE,
});

export const fetchValidationCompanyDetail = (validationID) => ({
  type: FETCH_VALIDATION_COMPANY_DETAIL,
  payload: {validationID}
});

export const fetchValidationCompanyDetailSuccess = (detail) =>({
  type: FETCH_VALIDATION_COMPANY_DETAIL_SUCCESS,
  payload: { detail} 
});

export const fetchValidationCompanyDetailFailure = (e) => ({
  type: FETCH_VALIDATION_COMPANY_DETAIL_FAILURE,
  payload: {e}
});

export const postValidateCompany = (validationID) => ({
  type: POST_VALIDATE_COMPANY,
  payload: { validationID }
});

export const postValidateCompanySuccess = () => ({
  type: POST_VALIDATE_COMPANY_SUCCESS,
});

export const postValidateCompanyFailure = (e) => ({
  type: POST_VALIDATE_COMPANY_FAILURE,
  payload: {e}
});

export const fetchEvents = (pais, ciudad, place, status) => ({
  type: FETCH_EVENTS,
  payload: { pais, ciudad, place, status }
});

export const fetchEventsSuccess = events => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: { events }
});

export const fetchEventsFailure = eor => ({
  type: FETCH_EVENTS_FAILURE,
  payload: { eor }
});

export const fetchCountries = () => ({ type: FETCH_COUNTRIES });
export const fetchCountriesSuccess = countries => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: { countries }
});
export const fetchCountriesFailure = eor => ({
  type: FETCH_COUNTRIES_FAILURE,
  payload: { eor }
});

export const fetchCities = country => ({
  type: FETCH_CITIES,
  payload: { country }
});

export const fetchCitiesSuccess = cities => ({
  type: FETCH_CITIES_SUCCESS,
  payload: { cities }
});

export const fetchCitiesFailure = eor => ({
  type: FETCH_CITIES_FAILURE,
  payload: { eor }
});

export const login = () => ({ type: LOGIN });

export const loginSuccess = data => ({
  type: LOGIN_SUCCESS,
  payload: { data }
});

export const loginFailure = e => ({
  type: LOGIN_FAILURE,
  payload: { e }
});

export const logout = () => ({ type: LOGOUT });

export const logoutSuccess = () => ({ type: LOGOUT_SUCCESS });

export const logoutFailure = e => ({
  type: LOGOUT_FAILURE,
  payload: { e }
});

export const fetchProfile = user => ({
  type: FETCH_PROFILE,
  payload: { user }
});

export const setProfile = profile => ({
  type: SET_PROFILE,
  payload: { profile }
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

export const fetchEventDetailFailure = e => ({
  type: FECTCH_EVENT_DETAIL_FAILURE,
  payload: { e }
});

export const fetchPlace = placeID => ({
  type: FETCH_PLACE,
  payload: { placeID }
});

export const fetchPlaceSuccess = place => ({
  type: FETCH_PLACE_SUCCESS,
  payload: { place }
});

export const fetchPlaceFailure = e => ({
  type: FETCH_PLACE_FAILURE,
  payload: { e }
});

export const fetchCityPlaces = cityID => ({
  type: FETCH_CITY_PLACES,
  payload: { cityID }
});

export const fetchCityPlacesSuccess = places => ({
  type: FETCH_CITY_PLACES_SUCCESS,
  payload: { places }
});

export const fetchCityPlacesFailure = e => ({
  type: FETCH_CITY_PLACES_FAILURE,
  payload: { e }
});

export const fetchEventBid = eventID => ({
  type: FETCH_EVENT_BID,
  payload: { eventID }
});

export const fetchEventBidSuccess = bids => ({
  type: FETCH_EVENT_BID_SUCCESS,
  payload: { bids }
});

export const fetchEventBidFailure = e => ({
  type: FETCH_EVENT_BID_FAILURE,
  payload: { e }
});

export const initialFetch = () => ({
  type: INITIAL_FETCH
});

export const initialFetchFailure = eor => ({
  type: INITIAL_FETCH,
  payload: { eor }
});

export const postEvent = form => ({
  type: POST_EVENT,
  payload: { form }
});

export const postEventSuccess = () => ({
  type: POST_EVENT_SUCCESS
});

export const postEventFailure = e => ({
  type: POST_EVENT_FAILURE,
  payload: { e }
});

export const fetchUserEventBids = userID => ({
  type: FETCH_USER_EVENT_BIDS,
  payload: { userID }
});

export const fetchUserEventBidsSuccess = userEventBids => ({
  type: FETCH_USER_EVENT_BIDS_SUCCESS,
  payload: { userEventBids }
});

export const fetchUserEventBidsFailure = e => ({
  type: FETCH_USER_EVENT_BIDS_FAILURE,
  payload: { e }
});

export const fetchUserSponsors = () => ({
  type: FETCH_USER_SPONSORS,
});

export const fetchUserSponsorsSuccess = sponsors => ({
  type: FETCH_USER_SPONSORS_SUCCESS,
  payload: { sponsors }
});

export const fetchUserSponsorsFailure = e => ({
  type: FETCH_USER_SPONSORS_FAILURE,
  payload: { e }
});

export const fetchSponsorDetail = (sponsorID) => ({
  type: FETCH_SPONSOR_DETAIL,
  payload: { sponsorID }
});

export const fetchSponsorDetailSuccess = sponsorDetail => ({
  type: FETCH_SPONSOR_DETAIL_SUCCESS,
  payload: { sponsorDetail }
});

export const fetchSponsorDetailFailure = e => ({
  type: FETCH_SPONSOR_DETAIL_FAILURE,
  payload: { e }
});

export const postSponsor = form => ({
  type: POST_SPONSOR,
  payload: {form}
});

export const postSponsorSuccess = (redirect) => ({
  type: POST_SPONSOR_SUCCESS,
  payload: {redirect},
});

export const postSponsorFailure = e => ({
  type: POST_SPONSOR_FAILURE,
  payload: { e }
});

export const postBid = form => ({
  type: POST_BID,
  payload: { form }
});

export const postBidSuccess = (participaciones, cantidad) => ({
  type: POST_BID_SUCCESS,
  payload: { participaciones, cantidad }
});

export const postBidFailure = e => ({
  type: POST_BID_FAILURE,
  payload: { e }
});

export const clearError = () => ({
  type: CLEAR_ERROR,
});

export const clearSuccess = () => ({
  type: CLEAR_SUCCESS
});

export const clearLoading = () => ({
  type: CLEAR_LOADING
});

export const postValidateMe = form => ({
  type: POST_VALIDATE_ME,
  payload: {form}
});

export const postValidateMeSuccess = (redirect) => ({
  type: POST_VALIDATE_ME_SUCCESS,
  payload: {redirect},
});

export const postValidateMeFailure = (e) => ({
  type: POST_VALIDATE_ME_FAILURE,
  payload: {e}
})

export const fetchValidationRequests = () => ({
  type: FETCH_VALIDATION_REQUESTS,
});

export const fetchValidationRequestsSuccess = (requests) => ({
  type: FETCH_VALIDATION_REQUESTS_SUCCESS,
  payload: {requests}
});

export const fetchValidationRequestsFailure = (e) => ({
  type: FETCH_VALIDATION_REQUESTS_FAILURE,
  payload: {e}
});

export const deleteSponsor = (id) => ({
  type: DELETE_SPONSOR,
  payload: {id}
});


export const deleteSponsorSuccess = (redirect) => ({
  type: DELETE_SPONSOR_SUCCESS,
  payload: {redirect}
});


export const deleteSponsorFailure = (e) => ({
  type: DELETE_SPONSOR_FAILURE,
  payload: {e}
});

export const setEventPaid = (idEvent) => ({
  type: SET_EVENT_PAID,
  payload: {idEvent}
});

export const setEventPaidSuccess = (redirect) => ({
  type: SET_EVENT_PAID_SUCCESS,
  payload: {redirect},
});


export const setEventPaidFailure = (e) => ({
  type: SET_EVENT_PAID_FAILURE,
  payload: {e}
});