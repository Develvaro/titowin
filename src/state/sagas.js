import {fork, takeEvery, put} from 'redux-saga/effects';
import { FETCH_EVENTS } from '../actions/type';
import { fetchEventsFailure } from '../actions';
import { databaseRef } from "../config/firebase";

function* fetchEventProcess() {
    try{

    }catch(err){
        yield put(fetchEventsFailure(err))
    }
}

function* watchFetchEvents(){
    yield takeEvery(FETCH_EVENTS, fetchEventProcess);
}

function* rootSaga () {
    yield fork(watchFetchEvents);
} 

export default rootSaga;