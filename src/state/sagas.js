import { fork, takeEvery, put, call, all, select } from "redux-saga/effects";
import { delay } from "redux-saga";
import { initialize } from "redux-form";
import moment from "moment";
import mime from "mime";
import uuid from "uuid";
import {
  FETCH_EVENTS,
  LOGIN,
  LOGOUT,
  FETCH_PROFILE,
  FETCH_COUNTRIES,
  FETCH_CITIES,
  FECTCH_EVENT_DETAIL,
  FETCH_EVENT_BID,
  INITIAL_FETCH,
  POST_EVENT,
  POST_BID,
  FETCH_USER_EVENT_BIDS,
  FETCH_SPONSOR_DETAIL,
  FETCH_USER_SPONSORS,
  POST_SPONSOR,
  FETCH_PLACE,
  FETCH_CITY_PLACES,
  POST_BID_SUCCESS
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
  fetchEventDetailSuccess,
  postEventFailure,
  fetchEventBidFailure,
  fetchEventBidSuccess,
  fetchUserEventBidsSuccess,
  fetchUserEventBidsFailure,
  fetchUserSponsorsSuccess,
  fetchUserSponsorsFailure,
  fetchSponsorDetailFailure,
  fetchSponsorDetailSuccess,
  postSponsorSuccess,
  postSponsorFailure,
  fetchPlaceSuccess,
  fetchPlaceFailure,
  fetchCityPlacesSuccess,
  fetchCityPlacesFailure,
  postEventSuccess,
  postBidSuccess,
  postBidFailure,
  clearSuccess
} from "../actions";
import { databaseRef } from "../config/firebase";
import firebase from "firebase";
import { getCountryByLocale } from "../utils/countries";

function* fetchEventDetailProcess(action) {
  try {
    const { eventID } = action.payload;
    const eventRef = databaseRef.collection("Evento").doc(eventID);

    const eventDoc = yield call([eventRef, "get"]);
    const eventData = eventDoc.data();

    const number = eventData.participaciones;

    console.log(number + 1);

    const placeRef = databaseRef.collection("Lugar").doc(eventData.lugar);
    const placeDoc = yield call([placeRef, "get"]);

    let bidRef = databaseRef
      .collection("Evento")
      .doc(eventID)
      .collection("Puja")
      .orderBy("cantidad", "desc")
      .limit(number + 1);
    const { docs } = yield call([bidRef, "get"]);

    const bids = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });

    yield put(
      fetchEventDetailSuccess({
        ...eventData,
        place: placeDoc.data(),
        id: eventDoc.id,
        bids
      })
    );
  } catch (e) {
    console.log(e);
    yield put(fetchEventDetailFailure(e));
  }
}

function* fetchEventProcess(action) {
  try {
    const { pais, ciudad, place } = action.payload;
    let colRef = databaseRef.collection("Evento");

    if (pais) {
      colRef = colRef.where("pais", "==", pais);
    }

    if (ciudad) {
      colRef = colRef.where("ciudad", "==", ciudad);
    }

    if (place) {
      colRef = colRef.where("lugar", "==", place);
    }

    const { docs } = yield call([colRef, "get"]);

    const places = yield all(
      docs.map(event => {
        console.log(event.data());
        console.log(event.data());

        const placeRef = databaseRef
          .collection("Lugar")
          .doc(event.data().lugar);
        return call([placeRef, "get"]);
      })
    );

    const events = docs.map((event, index) => ({
      ...event.data(),
      id: event.id,
      place: places[index].data()
    }));

    yield put(fetchEventsSuccess(events));
  } catch (err) {
    console.log(err);
    yield put(fetchEventsFailure(err));
  }
}

function* watchFetchEvents() {
  yield takeEvery(FETCH_EVENTS, fetchEventProcess);
}

function* fetchEventBidProcess(action) {
  try {
    const { eventID } = action.payload;

    const eventRef = databaseRef.collection("Evento").doc(eventID);
    const doc = yield call([eventRef, "get"]);
    const number = doc.data().participaciones;

    let bidRef = databaseRef
      .collection("Evento")
      .doc(eventID)
      .collection("Puja")
      .orderBy("cantidad", "desc")
      .limit(number);
    const { docs } = yield call([bidRef, "get"]);

    const result = docs.map(doc => {
      const data = doc.data();
      console.log(data);
      return { ...data, id: doc.id };
    });

    console.log(result);

    yield put(fetchEventBidSuccess(result));
  } catch (e) {
    yield put(fetchEventBidFailure(e));
  }
}

function* loginProcess() {
  try {
    const firebaseAuth = firebase.auth();
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = yield call([firebaseAuth, "signInWithPopup"], provider);

    yield put(loginSuccess(result.user));
    yield put(fetchProfile(result.user));
  } catch (e) {
    yield put(loginFailure(e));
  }
}

function* fetchProfileProcess(action) {
  try {
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
  } catch (e) {
    //console.log(e);
    yield put(fetchCountriesFailure(e));
  }
}

function* fetchCitiesProcess(action) {
  try {
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

function* fetchCityPlacesProcess(action) {
  try {
    const { cityID } = action.payload;
    const placesRef = databaseRef
      .collection("Lugar")
      .where("ciudad", "==", cityID);
    const { docs } = yield call([placesRef, "get"]);
    const places = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });
    yield put(fetchCityPlacesSuccess(places));
  } catch (e) {
    yield put(fetchCityPlacesFailure(e));
  }
}

function* fetchPlaceProcess(action) {
  try {
    const { placeID } = action.payload;
    const placeRef = databaseRef.collection("Lugar").doc(placeID);
    const doc = yield call([placeRef, "get"]);
    yield put(fetchPlaceProcess({ ...doc.data(), id: doc.id }));
  } catch (e) {
    yield put(fetchPlaceFailure(e));
  }
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

function* postEventProcess(action) {
  try {
    const id = uuid();
    const user = yield select(state => state.profile);

    const { form } = action.payload;

    const {
      imgupload,
      eventName,
      eventDate,
      category,
      eventTime,
      bidDate,
      bidTime,
      startBid,
      increment,
      participaciones
    } = form;

    const storageRef = firebase
      .storage()
      .ref(`Eventos/${id}.${mime.getExtension(imgupload[0].type)}`);

    const task = yield call([storageRef, "put"], imgupload[0]);
    const ref = task.ref;
    const url = yield call([ref, "getDownloadURL"]);

    const placeRef = databaseRef.collection("Lugar").doc(user.manage);
    const placeDoc = yield call([placeRef, "get"]);

    const cityRef = databaseRef
      .collection("Ciudad")
      .doc(placeDoc.data().ciudad);
    const cityDoc = yield call([cityRef, "get"]);

    const countryRef = databaseRef.collection("Pais").doc(cityDoc.data().pais);
    const countryDoc = yield call([countryRef, "get"]);
    const result = databaseRef.collection("Evento").doc(id);
    yield call([result, "set"], {
      titulo: eventName,
      urlPhoto: url,
      categoria: category,
      pais: countryDoc.id,
      ciudad: cityDoc.id,
      fecha: moment(`${eventDate} ${eventTime}`, "YYYY-MM-DD HH:mm").toDate(),
      estado: "abierto",
      bidDate: moment(`${bidDate} ${bidTime}`, "YYYY-MM-DD HH:mm").toDate(),
      //bidTime,
      startBid,
      increment,
      participaciones,
      lugar: user.manage
    });
    for (let i = 0; i < participaciones + 1; i++) {
      let pujasRef = databaseRef
        .collection("Evento")
        .doc(id)
        .collection("Puja")
        .doc();
      yield call([pujasRef, "set"], {
        cantidad: startBid - increment,
        usuario: user.id,
        email: user.email
      });
    }

    //console.log(moment(`${eventDate} ${eventTime}`));
    yield put(postEventSuccess());
  } catch (e) {
    console.log(e);
    yield put(postEventFailure(e));
  }
}

function* fetchUserEventBidsProcess(action) {
  try {
    const { userID } = action.payload;

    let userBids = databaseRef
      .collection("Usuario")
      .doc(userID)
      .collection("Puja");

    const { docs } = yield call([userBids, "get"]);
    const result = yield all(
      docs.map(doc => {
        const eventRef = databaseRef
          .collection("Evento")
          .doc(doc.data().eventID);
        const event = call([eventRef, "get"]);
        return event;
        //return {...doc.data(), id: doc.id};
      })
    );

    console.log(result);
    yield put(fetchUserEventBidsSuccess(result));
  } catch (e) {
    yield put(fetchUserEventBidsFailure(e));
  }
}

function* fetchSponsorDetailProcess(action) {
  try {
    const { sponsorID, userID } = action.payload;

    const sponsorRef = databaseRef
      .collection("Usuario")
      .doc(userID)
      .collection("Publicidad")
      .doc(sponsorID);

    const doc = yield call([sponsorRef, "get"]);
    yield put(fetchSponsorDetailSuccess({ ...doc.data(), id: doc.id }));
  } catch (e) {
    yield put(fetchSponsorDetailFailure(e));
  }
}

function* fetchUserSponsorsProcess(action) {
  try {
    const { userID } = action.payload;

    const sponsorsRef = databaseRef
      .collection("Usuario")
      .doc(userID)
      .collection("Publicidad");

    const { docs } = yield call([sponsorsRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });

    yield put(fetchUserSponsorsSuccess(result));
  } catch (e) {
    yield put(fetchUserSponsorsFailure(e));
  }
}

//TODO
function* postSponsorProcess(action) {
  try {
  } catch (e) {
    yield put(postSponsorFailure(e));
  }
}

const USER_NOT_LOGGED_IN_EXCEPTION = new Error("USER_NOT_LOGGED_IN");

function* postBidProcess(action) {
  try {
    const user = yield select(state => state.profile);
    const eventDetail = yield select(state => state.eventDetail);
    const { form } = action.payload;

    if (!user) {
      throw USER_NOT_LOGGED_IN_EXCEPTION;
    }

    const { participaciones, cantidad } = form;

    for (let i = 0; i < participaciones; i++) {
      const id = uuid();
      let pujasRef = databaseRef
        .collection("Evento")
        .doc(eventDetail.id)
        .collection("Puja")
        .doc(id);
      yield call([pujasRef, "set"], {
        cantidad,
        usuario: user.id,
        email: user.email
      });
    }
    yield put(postBidSuccess(participaciones, cantidad));
  } catch (e) {
    yield put(
      postBidFailure(
        e === USER_NOT_LOGGED_IN_EXCEPTION
          ? "Debes estar logeado"
          : "Ha habido un error pujando"
      )
    );
  }
}

function* successProcess() {
  yield call(delay, 3000);
  yield put(clearSuccess());
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

function* watchPostEvent() {
  yield takeEvery(POST_EVENT, postEventProcess);
}

function* watchProfile() {
  yield takeEvery(FETCH_PROFILE, fetchProfileProcess);
}

function* watchLogin() {
  yield takeEvery(LOGIN, loginProcess);
}

function* watchFetchUserEventBids() {
  yield takeEvery(FETCH_USER_EVENT_BIDS, fetchUserEventBidsProcess);
}

function* watchFetchSponsorDetail() {
  yield takeEvery(FETCH_SPONSOR_DETAIL, fetchSponsorDetailProcess);
}

function* watchFetchUserSponsors() {
  yield takeEvery(FETCH_USER_SPONSORS, fetchUserSponsorsProcess);
}

function* watchPostSponsor() {
  yield takeEvery(POST_SPONSOR, postSponsorProcess);
}

function* watchFetchPlace() {
  yield takeEvery(FETCH_PLACE, fetchPlaceProcess);
}

function* watchFetchCityPlaces() {
  yield takeEvery(FETCH_CITY_PLACES, fetchCityPlacesProcess);
}

function* watchPostBid() {
  yield takeEvery(POST_BID, postBidProcess);
}

function* watchSuccess() {
  yield takeEvery([POST_BID_SUCCESS], successProcess);
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
    fork(watchInitialFetch),
    fork(watchPostEvent),
    fork(watchFetchUserEventBids),
    fork(watchFetchUserSponsors),
    fork(watchFetchSponsorDetail),
    fork(watchPostSponsor),
    fork(watchFetchPlace),
    fork(watchFetchCityPlaces),
    fork(watchPostBid),
    fork(watchSuccess)
  ]);
}

export default rootSaga;
