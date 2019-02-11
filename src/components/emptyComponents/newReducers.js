//Un reducer será una variable accesible desde el state que nos conectemos.


import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import {
    FETCH_COUNTRIES_SUCCESS,
    FETCH_COUNTRIES_FAILURE,
} from "../actions/type.js";

const countries = (state = null, action) => {
    switch (action.type) {
      case FETCH_COUNTRIES_SUCCESS:
        return action.payload.countries;
      default:
        return state;
    }
  };

