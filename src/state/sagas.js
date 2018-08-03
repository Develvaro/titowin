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
  INITIAL_FETCH,
  POST_EVENT,
  FETCH_USER_EVENT_BIDS,
  FETCH_SPONSOR_DETAIL,
  FETCH_USER_SPONSORS,
  POST_SPONSOR,
  FETCH_PLACE,
  FETCH_CITY_PLACES,

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
} from "../actions";
import { databaseRef } from "../config/firebase";
import firebase from "firebase";
import { getCountryByLocale } from "../utils/countries";

function* fetchEventDetailProcess(action) {
  try {

    const { eventID } = action.payload;
    const eventRef = databaseRef.collection("Evento").doc(eventID);
    const doc = yield call([eventRef, "get"]);
    yield put(fetchEventDetailSuccess({...doc.data(), id: doc.id}))
  } catch (e) {
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

    if(place){
      colRef = colRef.where("lugar", "==", place)
    }

    const { docs } = yield call([colRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });
    yield put(fetchEventsSuccess(result));
  } catch (err) {
    yield put(fetchEventsFailure(err));
  }
}

function* watchFetchEvents() {
  yield takeEvery(FETCH_EVENTS, fetchEventProcess);
}

function* fetchEventBidProcess(action) {
  try{

    const { eventID } = action.payload;

    const eventRef = databaseRef.collection("Evento").doc(eventID);
    const doc = yield call([eventRef, "get"]);
    const number = doc.data().participaciones;

    let bidRef = databaseRef.collection("Evento").doc(eventID).collection("Puja").orderBy("cantidad", "desc").limit(number + 1);
    const { docs } = yield call([bidRef, "get"]);

    const result = docs.map(doc => {
      const data = doc.data();
      console.log(data);
      return { ...data, id: doc.id }
    });

    console.log(result);
    
    yield put(fetchEventBidSuccess(result));
  }catch(e){
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

function* fetchCityPlacesProcess(action){
  try{
    const {cityID} = action.payload;
    const placesRef = databaseRef.collection("Lugar").where("ciudad", "==" , cityID);
    const { docs } = yield call([placesRef, "get"]);
    const places = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });
    yield put(fetchCityPlacesSuccess(places));
  }catch(e){
    yield put(fetchCityPlacesFailure(e));
  }
}

function* fetchPlaceProcess(action){
  try{
    const {placeID} = action.payload;
    const placeRef = databaseRef.collection("Lugar").doc(placeID);
    const  doc  = yield call([placeRef, "get"]);
    yield put(fetchPlaceProcess({...doc.data(), id: doc.id}))
  }catch(e){
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

function* postEventProcess(action){
  try{
    console.log(action.payload);
  }catch(e){
    yield put(postEventFailure(e));
  }
}

function* fetchUserEventBidsProcess(action){
  try{
    const { userID } = action.payload;

    let userBids = databaseRef.collection("Usuario").doc(userID).collection("Puja");

    const { docs } = yield call([userBids, "get"]);
    const result = docs.map(doc => {
      //const eventRef = databaseRef.collection("Evento").doc(doc.data().eventID);
      //const event = yield call([eventRef, "get"]);
      //return { ...event.data(), id: event.id};
      return {...doc.data(), id: doc.id};
    });

    console.log(result);
    yield put(fetchUserEventBidsSuccess(result));
  }catch(e){
    yield put(fetchUserEventBidsFailure(e));
  }
}


function* fetchSponsorDetailProcess(action){
  try{
    const {sponsorID, userID} = action.payload;

    const sponsorRef = databaseRef.collection("Usuario").doc(userID).collection("Publicidad").doc(sponsorID);

    const doc = yield call([sponsorRef, "get"]);
    yield put(fetchSponsorDetailSuccess({...doc.data(), id: doc.id}))

  }catch(e){
    yield put(fetchSponsorDetailFailure(e));
  }
}

function* fetchUserSponsorsProcess(action){
  try{
    const { userID } = action.payload;
    
    const sponsorsRef = databaseRef.collection("Usuario").doc(userID).collection("Publicidad");

    const { docs } = yield call([sponsorsRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });

    yield put(fetchUserSponsorsSuccess(result));
    
  }catch(e){
    yield put(fetchUserSponsorsFailure(e));
  }
}


//TODO  
function* postSponsorProcess(action){
  try{

  }catch(e){
    yield put(postSponsorFailure(e));
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

function* watchFetchSponsorDetail(){
  yield takeEvery(FETCH_SPONSOR_DETAIL, fetchSponsorDetailProcess);
}

function* watchFetchUserSponsors(){
  yield takeEvery(FETCH_USER_SPONSORS, fetchUserSponsorsProcess)
}

function* watchPostSponsor(){
  yield takeEvery(POST_SPONSOR, postSponsorProcess);
}

function* watchFetchPlace(){
  yield takeEvery(FETCH_PLACE, fetchPlaceProcess);
}

function* watchFetchCityPlaces(){
  yield takeEvery(FETCH_CITY_PLACES, fetchCityPlacesProcess);
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
  ]);
}

export default rootSaga;
