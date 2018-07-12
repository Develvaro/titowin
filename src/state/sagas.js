import {fork, takeEvery, put, call, all} from 'redux-saga/effects';
import { FETCH_EVENTS, LOGIN, LOGOUT } from '../actions/type';
import { fetchEventsFailure, fetchEventsSuccess,
        loginSuccess, loginFailure, logoutFailure, logoutSuccess,
        
} from '../actions';
import { databaseRef } from "../config/firebase";
import firebase from 'firebase';

function* fetchEventProcess() {
    try{
        const colRef = databaseRef.collection("Evento");
        const {docs} = yield call([colRef, "get"]);
        const result = docs.map(doc => 
            {
                const data = doc.data();
                return {...data, id : doc.id};
            }
        );
        yield put(fetchEventsSuccess(result));
    }catch(err){
        yield put(fetchEventsFailure(err))
    }
}

function* watchFetchEvents(){
    yield takeEvery(FETCH_EVENTS, fetchEventProcess);
}

function* loginProcess(){
    try{
        const firebaseAuth = firebase.auth();
        const provider = new firebase.auth.GoogleAuthProvider(); 
        const result = yield call([firebaseAuth, "signInWithPopup"], provider);
        yield put(loginSuccess(result.user));
    }catch(e){
        yield put(loginFailure(e));
    }
};

function* watchLogin(){
    yield takeEvery(LOGIN, loginProcess);
}

function* logoutProcess(){
    try{
        const firebaseAuth = firebase.auth();
        yield call([firebaseAuth, "signOut"]);
        yield put(logoutSuccess());
    }catch(e){
        yield put(logoutFailure(e));
    }
}

function* watchLogout(){
    yield takeEvery(LOGOUT, logoutProcess);
}

function* rootSaga () {
    yield all([
        fork(watchFetchEvents),
        fork(watchLogin),
        fork(watchLogout),
    ])
} 

export default rootSaga;