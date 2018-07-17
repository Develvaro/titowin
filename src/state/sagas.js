import { fork, takeEvery, put, call, all } from "redux-saga/effects";
import {
  FETCH_EVENTS,
  LOGIN,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_COUNTRIES,
  FETCH_CITIES
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
  unSetProfile
} from "../actions";
import { databaseRef } from "../config/firebase";
import firebase from "firebase";

function* fetchEventProcess(action) {
  try {
    const { pais, ciudad, categoria, nombre } = action.payload;
    let colRef = databaseRef.collection("Evento");

    if (pais) {
      colRef = colRef.where("pais", "==", pais);
    }

    if (ciudad) {
      colRef = colRef.where("ciudad", "==", ciudad);
    }

    if (categoria) {
      colRef = colRef.where("categoria", "==", categoria);
    }

    const { docs } = yield call([colRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      if(nombre){
        if (data.nombre.includes(nombre)) {
          return { ...data, id: doc.id };
        }
        return null;
      }
      else{
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

function* loginProcess() {
  try {
    const firebaseAuth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = yield call([firebaseAuth, "signInWithPopup"], provider);

    yield put(loginSuccess(result.user));
    yield put(fetchProfile(result.user));
  } catch (e) {
    console.log(e);
    yield put(loginFailure(e));
  }
}

function* fetchProfileProcess(action) {
  try {
    console.log(action.payload.user.uid);
    const userRef = databaseRef.collection("Usuario").doc(action.payload.user.uid);
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
    const countries = docs.map(doc => doc.data() );
    console.log(docs);

    yield put(fetchCountriesSuccess(countries));
  } catch (e) {
    console.log(e);
    yield put(fetchCountriesFailure(e));
  }
}

function* fetchCitiesProccess(country){
  try {
    const cityRef = databaseRef.collection("Ciudad").where("pais", "==", country.name);
    const { docs } = yield call([cityRef, "get"]);
    const cities = docs.map(doc => doc.data());
    yield put(fetchCitiesSuccess(cities));
  } catch (error) {
    yield put(fetchCountriesFailure(error));    
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

function* watchLogout() {
  yield takeEvery(LOGOUT, logoutProcess);
}

function* watchFetchCountries() {
  yield takeEvery(FETCH_COUNTRIES, fetchCountriesProcess);
}

function* watchFetchCities() {
  yield takeEvery(FETCH_CITIES, fetchCitiesProccess);
}

function* rootSaga() {
  yield all([
    fork(watchFetchEvents),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchProfile),
    fork(watchFetchCountries),
    fork(watchFetchCities),
  ]);
}

export default rootSaga;
