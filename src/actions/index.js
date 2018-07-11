import { FETCH_EVENTS, FETCH_EVENTS_FAILURE, FETCH_EVENTS_SUCCESS } from './type';



export const fetchEvents = (pais, ciudad) => ({type: FETCH_EVENTS,
    payload: {pais,ciudad}
});

export const fetchEventsSuccess = (events) => ({type: FETCH_EVENTS_SUCCESS,
    payload: {events}
});

export const fetchEventsFailure = (error) => ({type: FETCH_EVENTS_FAILURE,
    payload: {error}
});