import { fork, takeEvery, put, call, all } from "redux-saga/effects";
import { initialize } from "redux-form";
import {
  FETCH_EVENTS,
  LOGIN,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_COUNTRIES,
  FETCH_CITIES,
  FECTCH_EVENT_DETAIL,
  FETCH_EVENT_BID,
  INITIAL_FETCH
} from "../actions/type";
import {
  fetchEventsFailure,
  fetchEventsSuccess,
  loginSuccess,
  fetchProfile,
  loginFailure,
  logoutFailure,
  logoutSuccess,
  setProfile,
  fetchCountriesFailure,
  fetchCountriesSuccess,
  fetchCitiesSuccess,
  unSetProfile,
  fetchEventDetailFailure,
  fetchCitiesFailure,
  fetchCities,
  initialFetchFailure,
  fetchEvents,
  fetchEventDetailSuccess
} from "../actions";
import { databaseRef } from "../config/firebase";
import firebase from "firebase";
import { getCountryByLocale } from "../utils/countries";

function* fetchEventDetailProcess(action) {
  try {

    const { eventID } = action.payload;
    const eventRef = databaseRef.collection("Evento").doc(eventID);
    const doc = yield call([eventRef, "get"]);
    console.log(doc);
    yield put(fetchEventDetailSuccess({...doc.data(), id: doc.id}))
  } catch (e) {
    yield put(fetchEventDetailFailure(e));
  }
}

function* fetchEventProcess(action) {
  try {
    const { pais, ciudad, nombre } = action.payload;
    let colRef = databaseRef.collection("Evento");

    if (pais) {
      colRef = colRef.where("pais", "==", pais);
    }

    if (ciudad) {
      colRef = colRef.where("ciudad", "==", ciudad);
    }

    const { docs } = yield call([colRef, "get"]);
    //docs.map(doc => console.log(doc));
    const result = docs.map(doc => {
      const data = doc.data();
      if (nombre) {
        if (data.nombre.includes(nombre)) {
          return { ...data, id: doc.id };
        }
        return null;
      } else {
        return { ...data, id: doc.id };
      }
    });
    yield put(fetchEventsSuccess(result));
  } catch (err) {
    yield put(fetchEventsFailure(err));
  }
}

function* watchFetchEvents() {
  yield takeEvery(FETCH_EVENTS, fetchEventProcess);
}

function* fetchEventBidProcess() {
  console.log("Hola");
}

function* loginProcess() {
  try {
    const firebaseAuth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = yield call([firebaseAuth, "signInWithPopup"], provider);

    yield put(loginSuccess(result.user));
    yield put(fetchProfile(result.user));
  } catch (e) {
    //console.log(e);
    yield put(loginFailure(e));
  }
}

function* fetchProfileProcess(action) {
  try {
    //console.log(action.payload.user.uid);
    const userRef = databaseRef
      .collection("Usuario")
      .doc(action.payload.user.uid);
    const doc = yield call([userRef, "get"]);

    if (!doc.exists) {
      const data = {
        id: action.payload.user.uid,
        email: action.payload.user.email,
        tipo: "empresa",
        validado: false
      };
      console.log("User does not exist");
      userRef.set(data);
      yield put(setProfile(data));
    } else {
      console.log("User exists");
      console.log(`/Lugar/ ${doc.data().manage.id}`);
      const eventRef = databaseRef
        .collection("Lugar")
        .doc(doc.data().manage.id);
      eventRef
        .get()
        .then(function(data) {
          if (data.exists) {
            console.log(data.data());
          } else {
            console.log("No hay documento");
          }
        })
        .catch(function(e) {
          console.log(e);
        });
      console.log();
      yield put(setProfile(doc.data()));
    }
  } catch (err) {
    console.log(err);
  }
}

function* fetchCountriesProcess() {
  try {
    const countryRef = databaseRef.collection("Pais");
    const { docs } = yield call([countryRef, "get"]);
    const countries = docs.map(doc => doc.data());
    //console.log(docs);

    yield put(fetchCountriesSuccess(countries));

    yield put(fetchCities());
    console.log(navigator.language);
  } catch (e) {
    //console.log(e);
    yield put(fetchCountriesFailure(e));
  }
}

function* fetchCitiesProcess(action) {
  try {
    // const { payload: { country }} = action;
    const cityRef = databaseRef
      .collection("Ciudad")
      .where("pais", "==", action.payload.country);
    const { docs } = yield call([cityRef, "get"]);
    const cities = docs.map(doc => doc.data());
    yield put(fetchCitiesSuccess(cities));
  } catch (error) {
    yield put(fetchCitiesFailure(error));
  }
}

function* watchProfile() {
  yield takeEvery(FETCH_PROFILE, fetchProfileProcess);
}

function* watchLogin() {
  yield takeEvery(LOGIN, loginProcess);
}

function* logoutProcess() {
  try {
    const firebaseAuth = firebase.auth();
    yield call([firebaseAuth, "signOut"]);
    yield put(logoutSuccess());
    yield put(unSetProfile());
  } catch (e) {
    yield put(logoutFailure(e));
  }
}

function* initialFetchProcess() {
  try {
    const countryRef = databaseRef.collection("Pais");
    const { docs } = yield call([countryRef, "get"]);
    const countries = docs.map(doc => doc.data());

    const { language } = navigator;
    yield put(fetchCountriesSuccess(countries));
    const browserCountry = yield call(getCountryByLocale, language);

    const selectedCountry = countries.find(
      countryObj => countryObj.nombre === browserCountry
    );

    const { nombre: pais, capital } = selectedCountry;

    const cityRef = databaseRef.collection("Ciudad").where("pais", "==", pais);
    const { docs: result } = yield call([cityRef, "get"]);
    const cities = result.map(doc => doc.data());
    yield put(fetchCitiesSuccess(cities));

    yield put(initialize("filter", { city: capital }));

    yield put(fetchEvents(pais, capital));
  } catch (e) {
    yield put(initialFetchFailure(e));
  }
}

function* watchLogout() {
  yield takeEvery(LOGOUT, logoutProcess);
}

function* watchFetchCountries() {
  yield takeEvery(FETCH_COUNTRIES, fetchCountriesProcess);
}

function* watchFetchCities() {
  yield takeEvery(FETCH_CITIES, fetchCitiesProcess);
}

function* watchEventDetail() {
  yield takeEvery(FECTCH_EVENT_DETAIL, fetchEventDetailProcess);
}

function* watchEventBids() {
  yield takeEvery(FETCH_EVENT_BID, fetchEventBidProcess);
}

function* watchInitialFetch() {
  yield takeEvery(INITIAL_FETCH, initialFetchProcess);
}

function* rootSaga() {
  yield all([
    fork(watchFetchEvents),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchProfile),
    fork(watchFetchCountries),
    fork(watchFetchCities),
    fork(watchEventDetail),
    fork(watchEventBids),
    fork(watchInitialFetch)
  ]);
}

export default rootSaga;
