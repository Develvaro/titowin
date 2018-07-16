import { fork, takeEvery, put, call, all } from "redux-saga/effects";
import {
  FETCH_EVENTS,
  LOGIN,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_COUNTRIES
} from "../actions/type";
import {
  fetchEventsFailure,
  fetchEventsSuccess,
  loginSuccess,
  loginFailure,
  logoutFailure,
  logoutSuccess,
  setProfile,
  fetchCountriesFailure,
  fetchCountriesSuccess
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
      if (data.nombre.includes(nombre)) {
        return { ...data, id: doc.id };
      }
      return null;
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
    yield put(fetchProfileProcess(result.user));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* fetchProfileProcess(user) {
  try {
    const userRef = databaseRef.collection("Usuarios").doc(user.uid);
    const doc = yield call([userRef, "get"]);

    if (!doc.exists()) {
      const data = {
        id: user.uid,
        email: user.email,
        tipo: "empresa",
        validado: false
      };
      console.log("User does not exist");
      userRef.set(data);
      yield put(setProfile(data));
    } else {
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
    yield put(fetchCountriesSuccess(countries));
  } catch (e) {
    console.log(e);
    yield put(fetchCountriesFailure(e));
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

function* rootSaga() {
  yield all([
    fork(watchFetchEvents),
    fork(watchLogin),
    fork(watchLogout),
    fork(watchProfile),
    fork(watchFetchCountries)
  ]);
}

export default rootSaga;
