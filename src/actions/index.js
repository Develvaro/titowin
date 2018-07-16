import { FETCH_EVENTS, FETCH_EVENTS_FAILURE, FETCH_EVENTS_SUCCESS,
         LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE,
         LOGOUT, LOGOUT_SUCCESS, LOGOUT_FAILURE, 
         FETCH_PROFILE, SET_PROFILE, UNSET_PROFILE,

} from './type';

export const fetchEvents = (pais, ciudad) => ({type: FETCH_EVENTS,
    payload: {pais,ciudad}
});

export const fetchEventsSuccess = (events) => ({type: FETCH_EVENTS_SUCCESS,
    payload: {events}
});

export const fetchEventsFailure = (error) => ({type: FETCH_EVENTS_FAILURE,
    payload: {error}
});

export const login = () => ({type: LOGIN});
export const loginSuccess = (data) => ({type: LOGIN_SUCCESS,
    payload: {data}
});
export const loginFailure = (err) => ({type: LOGIN_FAILURE,
    payload: {err}
});

export const logout = () => ({type: LOGOUT});

export const logoutSuccess = () => ({type: LOGOUT_SUCCESS});

export const logoutFailure = (err) => ({type: LOGOUT_FAILURE,
    payload: {err}
});

export const fetchProfile = (data) => ({type: FETCH_PROFILE,
    payload: {data}
})

export const setProfile = (data) => ({ type: SET_PROFILE,
    payload: {data}
});

export const unSetProfile = () => ({type: UNSET_PROFILE,})