import { fork, takeEvery, put, call, all, select } from "redux-saga/effects";
import History from "../config/History";
import { delay } from "redux-saga";
import { initialize } from "redux-form";
import moment from "moment";
import mime from "mime";
import axios from 'axios';
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
  POST_BID_SUCCESS,
  POST_VALIDATE_ME,
  POST_VALIDATE_ME_SUCCESS,
  FETCH_VALIDATION_REQUESTS,
  POST_VALIDATE_COMPANY,
  FETCH_VALIDATION_COMPANY_DETAIL,
  SET_LEAFLET_PLACE,
  POST_PLACE,
  POST_VALIDATE_PLACE,
  POST_SPONSOR_SUCCESS,
  DELETE_SPONSOR,
  FETCH_SPONSORS_TO_VALIDATE,
  POST_VALIDATE_SPONSOR,
  FETCH_EVENT_WINNERS,
  SET_EVENT_WINNERS,
  FETCH_MY_EVENTS,
  FETCH_WON_EVENTS,
  FETCH_WON_EVENT_DETAIL,
  FETCH_VALIDATED_SPONSORS,
  POST_EVENT_SPONSOR,
  SET_EVENT_PAID,
  FETCH_EVENT_PRIZES,
  POST_EVENT_PRIZE,
  DELETE_EVENT_PRIZE,
  SET_EVENT_PRIZES,
  POST_EVENT_DRAW_WINNERS,
} from "../actions/type";
import {
  postPlaceSuccess,
  postPlaceFailure,
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
  clearSuccess,
  postValidateMeSuccess,
  postValidateMeFailure,
  fetchValidationRequestsSuccess,
  fetchValidationRequestsFailure,
  postValidateCompanySuccess,
  postValidateCompanyFailure,
  fetchValidationCompanyDetailSuccess,
  fetchValidationCompanyDetailFailure,
  setLeafletPlace,
  unSetLeafletPlace,
  postValidatePlaceFailure,
  postValidatePlaceSuccess,
  postValidatePlace,
  fetchCityPlaces,
  deleteSponsor,
  deleteSponsorSuccess,
  deleteSponsorFailure,
  fetchSponsorsToValidateSuccess,
  fetchSponsorsToValidateFailure,
  postValidateSponsorSuccess,
  postValidateSponsorFailure,
  setEventWinnersSuccess,
  setEventWinnersFailure,
  fetchEventWinnersSuccess,
  fetchEventWinnersFailure,
  fetchMyEventsSuccess,
  fetchMyEventsFailure,
  fetchWonEventsSuccess,
  fetchWonEventsFailure,
  fetchWonEventDetailSuccess,
  fetchWonEventDetailFailure,
  fetchValidatedSponsorsFailure,
  fetchValidatedSponsorsSuccess,
  postEventSponsorFailure,
  postEventSponsorSuccess,
  setEventPaidSuccess,
  setEventPaidFailure,
  fetchEventPrizesFailure,
  fetchEventPrizesSuccess,
  deleteEventPrizeFailure,
  postEventPrizeFailure,
  setEventPrizesFailure,
  setEventPrizesSuccess,
  deleteEventPrizeSuccess,
  postEventPrizeSuccess,
  fetchEventPrizes,
  postEventDrawWinnersFailure,
  postEventDrawWinnersSuccess
} from "../actions";
import { databaseRef } from "../config/firebase";
import firebase from "firebase";
import { getCountryByLocale } from "../utils/countries";

function getCityName(lat, lon) {
  const cadenaWeb = "http://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon="+ lon +"&accept_language=es&zoom=18&addressdetails=1";
  console.log(cadenaWeb);
  return axios.request({
    method: 'get',
    url: cadenaWeb,
  });
}


//Fisher-Yates shuffle
function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i +1 ));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
}


function * postEventDrawWinnersProcess(action){
  try{
    const {eventID} = action.payload;

    const eventRef = databaseRef.collection("Evento").doc(eventID);

    const prizesRef = databaseRef.collection("Evento").doc(eventID).collection("Premios");

    let prizes = yield call([prizesRef, "get"]);
    var prizesDocs = prizes.docs.map(doc => {
      return  doc.data();
    });
  
    const participtansRef = databaseRef.collection("Evento").doc(eventID).collection("Draw");

    let participants = yield call([participtansRef, "get"]);
    var participantsDocs = participants.docs.map(doc => {
      return  doc.data() ;
    });


    yield call(shuffle, participantsDocs);
    yield call(shuffle, prizesDocs)
  

    if(participantsDocs.length > prizesDocs.length){ //Lo normal, más participantes que premios.
      yield all(
        prizesDocs.map((prize, index) => {

          console.log(participantsDocs[index].user);

          const userRef = databaseRef.collection("Usuario")
            .doc(participantsDocs[index].user)
            .collection("WonDraws").doc(eventID)
          
          const prizeRef = databaseRef.collection("Evento").doc(eventID).collection("Premios").doc(prize.id)

          const batch = databaseRef.batch();

          batch.set(userRef,{
            eventID: eventID,
            prizeDescription: prize.prizeDescription,
            prizeName: prize.prizeName,
            prizePickPlace: prize.prizePickPlace,
            prizePrize: prize.prizePrice,
          })

          batch.update(prizeRef,{
            winnerID: participantsDocs[index].user,
          })

          return call([batch, "commit"]);
        })

      )

    }else{

      yield all(
        participantsDocs.map((participant, index) => {

        let prize = prizesDocs[index]
        let userRef = databaseRef.collection("Usuario")
        .doc(participant.user)
        .collection("WonDraws").doc(eventID)
        let prizeRef = databaseRef.collection("Evento").doc(eventID).collection("Premios").doc(prize.id)

        var batch = databaseRef.batch();
        batch.set(userRef,{
          eventID: eventID,
          prizeID: prize.id,
          prizeDescription: prize.prizeDescription,
          prizeName: prize.prizeName,
          prizePickPlace: prize.prizePickPlace,
          prizePrize: prize.prizePrice,
        })

        batch.update(prizeRef,{
          winnerID: participant.user,
        })

        return call([batch, "commit"]);

        })
      )   
    }

    yield call([eventRef, "update"], {
      estado: "finished",
    })

    yield(fetchEventDetailProcess({
      payload:{
        eventID: eventID,
      }
    }))
    yield put(postEventDrawWinnersSuccess())
  }
  catch(e){
    console.log(e);
    yield put(postEventDrawWinnersFailure())
  }
}

function * setEventPrizesProcess(action){
  try{
    const {idEvent} = action.payload;

    const ref = databaseRef.collection("Evento").doc(idEvent)
    yield call([ref,"update"],{
      estado: "pendingdraw"
    });

    yield(fetchEventDetailProcess({
      payload:{
        eventID: idEvent,
      }
    }))
    yield put(setEventPrizesSuccess())
  }
  catch(e){
    yield put(setEventPrizesFailure(e))
  }
}

function * postEventPrizeProcess(action){
  try{

    const user = yield select(state => state.user);
    const eventDetail = yield select(state => state.eventDetail);

    const { data } = action.payload;

    const {
      prizeName,
      prizePrice,
      prizeDescription,
      prizePickPlace,
    } = data;
  
    const idPrize = uuid()
    const eventRef = databaseRef.collection("Evento").doc(eventDetail.id).collection("Premios").doc(idPrize);
     

    yield call([eventRef, "set"],{
      id: idPrize,
      manager: user.uid,
      eventID: eventDetail.id,
      prizeName: prizeName,
      prizePrice: prizePrice,
      prizeDescription: prizeDescription,
      prizePickPlace: prizePickPlace,
    });

    yield(fetchEventPrizesProcess({
        payload:{
          idEvent: eventDetail.id
        }
    }))
    yield put(postEventPrizeSuccess())

  }
  catch(e){
    console.log(e);
    yield put(postEventPrizeFailure(e))
  }
}

function * deleteEventPrizeProcess(action){
  try{
    const {idEvent, idPrize} = action.payload;

    const prizeRef = databaseRef.collection("Evento").doc(idEvent).collection("Premios").doc(idPrize);
    yield call([prizeRef, "delete"]);

    
    yield(fetchEventPrizesProcess({
      payload:{
        idEvent: idEvent,
      }
    }))
    yield put(deleteEventPrizeSuccess());
  }
  catch(e){
    yield put(deleteEventPrizeFailure(e))
  }
}

function * fetchEventPrizesProcess(action){
  try{
    console.log(action)
    const {idEvent} = action.payload;
    const eventPrizesRef = databaseRef.collection("Evento").doc(idEvent).collection("Premios")
   
    const { docs } = yield call([eventPrizesRef, "get"]);
    const eventPrizes = docs.map(doc => {
      return  doc.data() ;
    });

    console.log(eventPrizes)
    yield put(fetchEventPrizesSuccess(eventPrizes))
  }
  catch(e){
    yield put(fetchEventPrizesFailure())
  }
}

function * setEventPaidProcess(action){
  try{
    const {idEvent} = action.payload;

    const eventRef = databaseRef.collection("Evento").doc(idEvent);
    
    yield call([eventRef,"update"],{
      estado: "pendingprize",
      pagado: true,
    })


    yield(fetchEventDetailProcess({
      payload:{
        eventID: idEvent,
      }
    }))
    yield put(setEventPaidSuccess());
  }catch(e){
    if(e.message){
      yield put(setEventPaidFailure(e.message))
    }
    else{
      yield put(setEventPaidFailure(e))
    }
  }
}

function * postEventSponsorProcess(action){
  try{

    const user = yield select(state => state.user);

    const {ticket, idEvent, idSponsor} = action.payload;

 
    const eventTicket = databaseRef.collection("Evento").doc(idEvent).collection("Winners").doc(ticket);
    const ticketRef = databaseRef.collection("Usuario").doc(user.uid).collection("WonEvents").doc(ticket);
    
    var batch = databaseRef.batch();
    
    batch.update(eventTicket,{
      sponsor: idSponsor,
      visualizaciones: 0,
    });

    batch.update(ticketRef,{  
      hasSponsor: true,
    });

    console.log(batch);

    yield call([batch, "commit"]);
    
    const redirect = "/profile/wonevent/" +ticket;

    yield put(postEventSponsorSuccess(redirect));
  }
  catch(e){
    if(e.message){
      yield put(postEventSponsorFailure(e.message))
    }
    else{
      yield put(postEventSponsorFailure(e))
    }
  }
}

function * fetchValidatedSponsorsProcess(){
  try{
    const user = yield select(state => state.user);

    const sponsorsRef = databaseRef.collection("Sponsors")
    .where("user", "==", user.uid)
    .where("validado", "==", true);

    const { docs } = yield call([sponsorsRef, "get"]);
    const result = docs.map(doc => {
      return  doc.data() ;
    });

    yield put(fetchValidatedSponsorsSuccess(result));

  }
  catch(e){
    if(e.message){
      yield put(fetchValidatedSponsorsFailure(e.message))
    }
    else{
      yield put(fetchValidatedSponsorsFailure(e))
    }
  }
}

function * fetchWonEventDetailProcess(action){
  
  try{
    const {ticket} = action.payload;
    const user = yield select(state => state.user);
    const ticketRef = databaseRef.collection("Usuario").doc(user.uid).collection("WonEvents").doc(ticket);
    const ticketDoc = yield call([ticketRef, "get"]);
    const ticketData = ticketDoc.data();

    const eventRef = databaseRef.collection("Evento").doc(ticketData.evento);
    const eventDoc = yield call([eventRef, "get"]);
    yield put(fetchEventDetailSuccess({...eventDoc.data(), id: eventDoc.id}));
    yield put(fetchWonEventDetailSuccess(ticketData));
  }
  catch(e){
    if(e.message){
      yield put(fetchWonEventDetailFailure(e.message))
    }
    else{
      yield put(fetchWonEventDetailFailure(e))
    }
  }

}

function* fetchEventWinnersProcess(action){
  try{
    const {id, ganadores} = action.payload;

    console.log(ganadores)
    let pujasRef = databaseRef.collection("Evento").doc(id)
      .collection("Puja").orderBy("cantidad","desc").limit(ganadores)


    
    const { docs } = yield call([pujasRef, "get"]);
    const winners = docs.map((doc, index) => {
      const data = doc.data();
      return { ...data, posicion: index +1 };
    });

    console.log(winners);

    yield put(fetchEventWinnersSuccess(winners))
  }catch(e){
    if(e.message){
      yield put(fetchEventWinnersFailure(e.message))
    }
    else{
      yield put(fetchEventWinnersFailure(e))
    }
  }
}

function * fetchWonEventsProcess(action){
  try{
    const { id } = action.payload;

    const wonEventsRef = databaseRef.collection("Usuario").doc(id).collection("WonEvents");
    const { docs } = yield call([wonEventsRef, "get"]);
    
    const wonEvents = yield all(
      docs.map(doc => {
        const eventRef = databaseRef
          .collection("Evento")
          .doc(doc.data().evento);

          const eventDoc = call([eventRef, "get"]);

        return eventDoc;
      })
    );

    let wonEventsData = {}

    console.log(wonEvents.length);
    if(wonEvents.length > 0)
    {
      const places = yield all(
        wonEvents.map(event => {
  
          const placeRef = databaseRef
            .collection("Lugar")
            .doc(event.data().lugar);
          return call([placeRef, "get"]);
        })
      );
  
      wonEventsData = docs.map((doc, index) => ({
        ticket: doc.id,
        cantidad: doc.data().cantidad,
        pagado: doc.data().pagado,
        hasSponsor: doc.data().hasSponsor,
        ...wonEvents[index].data(),
        id: wonEvents[index].id,
        place: places[index].data(),
      }));
  
    }

    console.log(wonEventsData);


    
    yield put(fetchWonEventsSuccess(wonEventsData))
  }catch(e){
    if(e.message){
      yield put(fetchWonEventsFailure(e.message))
    }
    else{
      yield put(fetchWonEventsFailure(e))
    }
  }
}

function * fetchMyEventsProcess(action){
  try{
    const {id } = action.payload;

    const userRef = databaseRef.collection("Usuario").doc(id);
    const userDoc = yield call([userRef, "get"]);
    const userManager = userDoc.data().manage;


    let colRef = databaseRef.collection("Evento");


    colRef = colRef.where("lugar", "==", userManager);
    

    const { docs } = yield call([colRef, "get"]);

    const events = docs.map((event) => ({
      ...event.data(),
      id: event.id,
    }));
    console.log(userManager);
/*
    const eventsRef = databaseRef.collection("Evento")
    .where("lugar", "==", userManager);
    const {eventDocs} = yield call([eventsRef, "get"]);
    console.log(eventDocs);
    const events = eventDocs.map(event => {
      console.log(event.data());
      return event.data();
    });
*/

    yield put(fetchMyEventsSuccess(events))
  }catch(e){
    if(e.message){
      yield put(fetchMyEventsFailure(e.message))
    }
    else{
      yield put(fetchMyEventsFailure(e))
    }
  }
}



function * setEventWinnersProcess(action){
  try{
    
    const {id} = action.payload;
    
    const eventRef = databaseRef.collection("Evento").doc(id);
    const eventDoc = yield call([eventRef, "get"]);
    
    const eventData = eventDoc.data();
    const participaciones = eventData.participaciones;
    
    const pujasRef = databaseRef.collection("Evento").doc(id)
                .collection("Puja")
                .orderBy("cantidad","desc")
                .limit(participaciones);
    const { docs } = yield call([pujasRef, "get"]);

    var batch = databaseRef.batch();

    const pujas = docs.map((doc, index) => {
      const winnerID = uuid().toString();
      const winnerRef = databaseRef.collection("Evento").doc(id).collection("Winners").doc(winnerID);
      const userRef = databaseRef.collection("Usuario").doc(doc.data().usuario).collection("WonEvents").doc(winnerID);

      batch.set(userRef,{
        evento: id,
        posicion: index +1,
        cantidad: doc.data().cantidad,
        pagado:false,
        hasSponsor: false,
        id: winnerID,
      });

      batch.set(winnerRef,{
        userID: doc.data().usuario,
        posicion: index+1,
        winnerID: winnerID,
        sponsor: "",
        visualizaciones: 0,
      });

      return doc.data();
    });

    batch.update(eventRef,{
      estado: "pendingpay",
    });

    yield call([batch, "commit"]);

    const redirect = "/manage/event/" + id
    yield(fetchEventDetailProcess({
      payload:{
        eventID: id,
      }
    }))
    yield put(setEventWinnersSuccess(redirect))
  }
  catch(e){
    console.log(e);
    if(e.message){
      yield put(setEventWinnersFailure(e.message))
    }
    else{
      yield put(setEventWinnersFailure(e))

    }
  }
}

function* postValidateSponsorProcess(action){
  try{

    const {id} = action.payload;
    const sponsorRef = databaseRef.collection("Sponsors").doc(id);
    yield call([sponsorRef, "update"], {
      validado: true,
    });
    const redirect = "/profile"

    yield put(postValidateSponsorSuccess(redirect));

  }catch(e){
    if(e.message){
      yield put(postValidateSponsorFailure(e.message))
    }
    else{
      yield put(postValidateSponsorFailure(e))
    }
  }
}

function* fetchSponsorsToValidateProcess(){
  try{

    const sponsorsRef = databaseRef.collection("Sponsors").where("validado", "==", false)

    const { docs } = yield call([sponsorsRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });

    yield put(fetchSponsorsToValidateSuccess(result))
  }
  catch(e){
    if(e.message){
      yield put(fetchSponsorsToValidateFailure(e.message))
    }
    else{
      yield put(fetchSponsorsToValidateFailure(e))

    }
  }
}

function * deleteSponsorProcess(action){
  try{

    const {id} = action.payload;
    console.log("COMENCEMOS");
    const user = yield select(state => state.user);
    console.log(user);

    const sponsorRef = databaseRef.collection('Sponsors').doc(id)

    
    yield call([sponsorRef, "delete"]);
/*
    const sponsorDoc = yield call([sponsorRef, "get"]);

    if(user.uid == sponsorDoc.data().user){
      const storageRef = firebase
      .storage()
      .ref(`Sponsors/${id}`);

      yield call([storageRef, "delete"]);
    }
    else{
      throw new Error("Not your sponsor");
    }
  */  
    const redirect = "/profile/sponsors/"
    yield put(deleteSponsorSuccess(redirect));
  }
  catch(e){
    console.log(e);
    if(e.message){
      yield put(deleteSponsorFailure(e.message));

    }else{
      yield put(deleteSponsorFailure("Debido a un error no se ha podido borrar tu anuncio."));
    }
  }
}

function* postValidatePlaceProcess(action){
  try{
    const id = uuid();

    const { form } = action.payload;
    console.log(form);
    const {
      placename,
      aforo,
      photo,
      lat,
      lon,
      email,
      telefono,
      files,
    } = form;

    const storageRef = firebase
    .storage()
    .ref(`Lugar/${id}`);

    const task = yield call([storageRef, "put"], photo[0]);
    const ref = task.ref;
    const urlphoto = yield call([ref, "getDownloadURL"]);


    const otherStorageRef = firebase
    .storage()
    .ref(`Manager/${email}`);
    
    yield call([otherStorageRef, "put"], files[0]);

    var location = new firebase.firestore.GeoPoint(parseFloat(lat),parseFloat(lon));

    const result = databaseRef.collection("Usuario").where("email", "==", email);
    const emailDocs = yield call([result, "get"]);
    const actualizar = databaseRef.collection("Usuario").doc(emailDocs.docs[0].id);
    
    const nuevoLugarRef = databaseRef.collection("Lugar").doc(id);

    let {data} = yield call(getCityName , lat, lon );
    if(!data.address.city && !data.address.village && !data.address.town){
      yield put(postValidatePlaceFailure("Fallo al encontrar la ciudad, inténtalo de nuevo"));
    }
    else{
    
    
    let city = "";

    //Nominatim puede devolver ciudad, o villa o town dependiendo de lo que tenga asignado esa zona.
    //Para nosotros nos da igual como lo llame, será la ciudad.
    if(data.address.town){
      city = data.address.town;
    }   
    if(data.address.village){
      city= data.address.village;
    }
    if(data.address.city){
      city = data.address.city;
    }
    
    const cityRef = databaseRef.collection("Ciudad").doc(city )
    const citiDoc = yield call([cityRef,"get"]);
   
    if(!citiDoc.exists){
      yield call([cityRef,"set"],{
        nombre: city,
        pais: data.address.country,
      })
    }

    var batch = databaseRef.batch();

    batch.update(actualizar,{
      tipo: "manager",
      manage: id,
      telefono: telefono,
    });

    batch.set(nuevoLugarRef,{
      nombre: placename,
      posicion: location,
      aforoMax: aforo,
      ciudad: city,
      foto: urlphoto,
    });

    yield call([batch,'commit']);

    const redirect = "/profile";
    yield put(postValidatePlaceSuccess(redirect));
  }

  }
  catch(e){
    if(e.message){
      yield put(postValidatePlaceFailure(e.message));
    }else{
      yield put(postValidatePlaceFailure(e));

    }
  }
}

function * postPlaceProcess(action){
  try{

    const id = uuid();

    const { form } = action.payload;

    const {
      peticionID,
      placeName,
      aforo,
      lat,
      lon,
      ciudad: ciudad,
      qr: qr,
      manager: manager,
    } = form;

    const result = databaseRef.collection("Lugar").doc(id);
/*
    if(manager){
      const userRef = databaseRef.collection("Usuario").doc(manager);
      const userDoc = yield call([userRef,'get']);
      const user = userDoc.data();

      if(user.tipo == "novalidado")
      {
            // Get a new write batch
        var batch = databaseRef.batch();

        // Set the value of 'NYC'
        batch.set(userRef, {
          validado: true, 
          email_empresa: validationData.email,
          nif: validationData.nif,
          companyPlace: validationData.place,
          telefono: validationData.telefono,
          fileurl: validationData.fileurl,
        });

        // Delete the city 'LA'
        batch.delete(validationRef);

        yield call([batch,'commit']);

      }
    }
*/

    yield call([result, "set"], {
      placeName: placeName,
      aforoMax: aforo,
      lat: lat,
      lon: lon,
      qr: qr,
      ciudad: ciudad,
    });

    yield put(postPlaceSuccess());

  }
  catch(e){
    if(e.message){
      yield put(postPlaceFailure(e.message));
    }else{
      yield put(postPlaceFailure(e));

    }
  }
}

function* setLeafletPlaceProcess(action){
  try{
    const { leafletPlace } = action.payload;
    yield put(setLeafletPlace(leafletPlace));
  }
  catch(e){
    yield put(unSetLeafletPlace());
  }
}

function* fetchValidationCompanyDetailProcess(action){
  try{
    const { validationID } = action.payload;

    const validationRef = databaseRef
      .collection("PeticionEmpresa")
      .doc(validationID);

    const doc = yield call([validationRef, "get"]);
      yield put(fetchValidationCompanyDetailSuccess(doc.data()));
  }
  catch(e){
    if(e.message){
      yield put(fetchValidationCompanyDetailFailure(e.message));
    }else{
      yield put(fetchValidationCompanyDetailFailure(e));

    }
  }
}


function* postValidateProcess(action){
  try{

    const {
      validationID
    } = action.payload;

    console.log(validationID);

    const validationRef = databaseRef.collection("PeticionEmpresa").doc(validationID);
    const validationDoc = yield call([validationRef,'get']);
    const validationData = validationDoc.data();
    const userID = validationData.userID;

    console.log(userID);

    const userRef = databaseRef.collection("Usuario").doc(userID);
        // Get a new write batch
    var batch = databaseRef.batch();

    // Set the value of 'NYC'
    batch.set(userRef, {
      validado: true, 
      email_empresa: validationData.email,
      nif: validationData.nif,
      companyPlace: validationData.place,
      telefono: validationData.telefono,
      fileurl: validationData.fileurl,
    });

    // Delete the city 'LA'
    batch.delete(validationRef);

    // Commit the batch
    yield call([batch,'commit']);
    const redirect = "/profile";
    yield put(postValidateCompanySuccess(redirect));

  }
  catch (e){
    if(e.message){
      yield put(postValidateCompanyFailure(e.message));
    }else{
      yield put(postValidateCompanyFailure(e));

    }
  }
}

function* fetchEventDetailProcess(action) {
  try {
    const { eventID } = action.payload;
    const eventRef = databaseRef.collection("Evento").doc(eventID);

    const eventDoc = yield call([eventRef, "get"]);
    const eventData = eventDoc.data();

    const number = eventData.participaciones;

    //console.log(number + 1);

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
    if(e.message){
      yield put(fetchEventDetailFailure(e.message));
    }else{
      yield put(fetchEventDetailFailure(e));

    }
  }
}
function * fetchValidationRequestsProcess(){
  try{
    const requestsRef = databaseRef.collection("PeticionEmpresa");

    const {docs} = yield call([requestsRef, "get"]);

    const requests = docs.map(doc => doc.data());

    yield put(fetchValidationRequestsSuccess(requests));

  }
  catch(e){
    if(e.message){
      yield put(fetchValidationRequestsFailure(e.message));
    }else{
      yield put(fetchValidationRequestsFailure(e));

    }
  }
}

function * watchFetchValidationRequests(){
  yield takeEvery(FETCH_VALIDATION_REQUESTS, fetchValidationRequestsProcess);

}
function* fetchEventProcess(action) {
  try {
    const { pais, ciudad, place, status } = action.payload;
    console.log(action.payload);

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

    if(status){
      colRef = colRef.where("estado", "==", status);
    }

    const { docs } = yield call([colRef, "get"]);

    const places = yield all(
      docs.map(event => {

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
  } catch (e) {
    if(e.message){
      yield put(fetchEventsFailure(e.message));
    }else{
      yield put(fetchEventsFailure(e));

    }
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
    if(e.message){
      yield put(fetchEventBidFailure(e.message));
    }else{
      yield put(fetchEventBidFailure(e));

    }

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
    if(e.message){
      yield put(loginFailure(e.message));
    }else{
      yield put(loginFailure(e));

    }
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
        tipo: "new",
        validado: false
      };
      console.log("User does not exist");
      yield call([userRef,"set"], data);
      yield put(setProfile(data));
    } else {
      //console.log(doc.data());
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
    if(e.message){
      yield put(fetchCountriesFailure(e.message));
    }else{
      yield put(fetchCountriesFailure(e));

    }
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
  } catch (e) {
    if(e.message){
      yield put(fetchCitiesFailure(e.message));
    }else{
      yield put(fetchCitiesFailure(e));

    }
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
    if(e.message){
      yield put(fetchCityPlacesFailure(e.message));
    }else{
      yield put(fetchCityPlacesFailure(e));

    }
  }
}

function* fetchPlaceProcess(action) {
  try {
    const { placeID } = action.payload;
    const placeRef = databaseRef.collection("Lugar").doc(placeID);
    const doc = yield call([placeRef, "get"]);
    yield put(fetchPlaceProcess({ ...doc.data(), id: doc.id }));
  } catch (e) {
    if(e.message){
      yield put(fetchPlaceFailure(e.message));
    }else{
      yield put(fetchPlaceFailure(e));

    }
  }
}

function* logoutProcess() {
  try {
    const firebaseAuth = firebase.auth();
    yield call([firebaseAuth, "signOut"]);
    yield put(logoutSuccess());
    yield put(unSetProfile());
  } catch (e) {

    if(e.message){
      yield put(logoutFailure(e.message));
    }else{
      yield put(logoutFailure(e));

    }
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
    yield put(fetchCityPlaces(capital));

    yield put(initialize("filter", { city: capital }));

    yield put(fetchEvents(pais, capital, null, "abierto"));
  } catch (e) {
    if(e.message){
      yield put(initialFetchFailure(e.message));
    }else{
      yield put(initialFetchFailure(e));

    }
  }
}

function* postValidateMeProcess(action){
  try{

    const id = uuid();

    const { form } = action.payload;

    const {
      companyName,
      phone,
      nif,
      lat,
      lon,
      email,
      fileurl,
    } = form;
    console.log(form);
    var location = new firebase.firestore.GeoPoint(parseFloat(lat),parseFloat(lon));
    const storageRef = firebase
      .storage()
      .ref(`Empresa/${email}`);

      console.log("HOLA");
    const task = yield call([storageRef, "put"], fileurl[0]);
    const ref = task.ref;
    
    const url = yield call([ref, "getDownloadURL"]);


    const result = databaseRef.collection("Usuario").where("email", "==", email);
    const emailDocs = yield call([result, "get"]);
    const actualizar = databaseRef.collection("Usuario").doc(emailDocs.docs[0].id);
    console.log("LLEGO");
    yield call([actualizar, "update"], {
      empresa: companyName,
      telefono: phone,
      nif: nif,
      place: location,
      tipo: "empresa",
      my_docs: url,
    });
    console.log("CALLED");
    const redirect = "/profile";
    yield put(postValidateMeSuccess(redirect));
  }
  catch(e){
    if(e.message){
      yield put(postValidateMeFailure(e.message));
    }else{
      yield put(postValidateMeFailure(e));

    }
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
      id: id,
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
      lugar: user.manage,
      pagado: false,
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
    if(e.message){
      yield put(postEventFailure(e.message));
    }else{
      yield put(postEventFailure(e));

    }
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
    const { sponsorID } = action.payload;

    const sponsorRef = databaseRef
      .collection("Sponsors")
      .doc(sponsorID)

    const doc = yield call([sponsorRef, "get"]);
    console.log(doc);
    console.log(doc.data());
    if(!doc.exists){
      yield put(fetchSponsorDetailFailure("No detail"))
    }
    else{
      yield put(fetchSponsorDetailSuccess(doc.data()));
    }
  } catch (e) {
    if(e.message){
      yield put(fetchSponsorDetailFailure(e.message));
    }else{
      yield put(fetchSponsorDetailFailure(e));

    }
  }
}



function* fetchUserSponsorsProcess() {
  try {
    const user = yield select(state => state.user);

    const sponsorsRef = databaseRef
      .collection("Sponsors")
      .where("user", "==", user.uid );

    const { docs } = yield call([sponsorsRef, "get"]);
    const result = docs.map(doc => {
      const data = doc.data();
      return { ...data, id: doc.id };
    });

    yield put(fetchUserSponsorsSuccess(result));
  } catch (e) {

    if(e.message){
      yield put(fetchUserSponsorsFailure(e.message));
    }else{
      yield put(fetchUserSponsorsFailure(e));

    }
  }
}

//TODO
function* postSponsorProcess(action) {
  try {
    const id = uuid();
    const user = yield select(state => state.user);
    console.log(action.payload);
    const { form } = action.payload;

    console.log(form);

    let {
      imgupload,
      nombreanuncio,
      urlweb,
    } = form;
    
    if (!/^(f|ht)tps?:\/\//i.test(urlweb)) {
      urlweb = "http://" + urlweb;
   }
    const storageRef = firebase
      .storage()
      .ref(`Sponsors/${id}aa`);


    const task = yield call([storageRef, "put"], imgupload[0]);
    const ref = task.ref;
    const url = yield call([ref, "getDownloadURL"]);

    const sponsorRef = databaseRef.collection("Sponsors").doc(id);
    yield call([sponsorRef, "set"], {
      id: id,
      texto: nombreanuncio,
      urlPhoto: url,
      urlWeb: urlweb,
      user: user.uid,
      validado: false,
    });
    const redirect = `/profile/sponsors/detail/${id}`
    yield put(postSponsorSuccess(redirect));

  } catch (e) {
    if(e.message){
      yield put(postSponsorFailure(e.message));
      
    }
    else{
      if(e.message){
        yield put(postSponsorFailure(e.message));
      }else{
        yield put(postSponsorFailure(e));
  
      }
    }
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

        console.log("/Evento/" + eventDetail.id + "/Puja/" + id)
        console.log("Cantidad: " + cantidad + " usuario: " + user.id + " email: " + user.email + " time : " + firebase.firestore.FieldValue.serverTimestamp())
      yield call([pujasRef, "set"], {
        cantidad,
        usuario: user.id,
        email: user.email,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });

    }

    yield(fetchEventDetailProcess({
      payload:{
        eventID: eventDetail.id,
      }
    }))

    yield put(postBidSuccess(participaciones, cantidad));
  } catch (e) {
    yield put(
      postBidFailure(
        e === USER_NOT_LOGGED_IN_EXCEPTION
          ? "Debes estar logeado"
          : e
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
  yield takeEvery([POST_BID_SUCCESS, POST_VALIDATE_ME_SUCCESS, POST_SPONSOR_SUCCESS], successProcess);
}

function* watchPostValidateMe() {
    yield takeEvery([POST_VALIDATE_ME], postValidateMeProcess);
}

function * watchPostValidateCompany() {
  yield takeEvery(POST_VALIDATE_COMPANY, postValidateProcess);
}

function* watchFetchValidationCompanyDetail(){
  yield takeEvery(FETCH_VALIDATION_COMPANY_DETAIL, fetchValidationCompanyDetailProcess);
}

function* watchSetLeafletPlace(){
  yield takeEvery(SET_LEAFLET_PLACE, setLeafletPlaceProcess);
}

function * watchPostPlace(){
  yield takeEvery(POST_PLACE, postPlaceProcess);
}

function * watchPostValidatePlace(){
  yield takeEvery(POST_VALIDATE_PLACE, postValidatePlaceProcess);
}

function * watchDeleteSponsor(){
  yield takeEvery( DELETE_SPONSOR, deleteSponsorProcess);
}

function * watchFetchSponsorsToValidate(){
  yield takeEvery( FETCH_SPONSORS_TO_VALIDATE, fetchSponsorsToValidateProcess);
}

function * watchPostValidateSponsor(){
  yield takeEvery( POST_VALIDATE_SPONSOR, postValidateSponsorProcess);
}

function * watchFinishEventBid(){
  yield takeEvery( SET_EVENT_WINNERS, setEventWinnersProcess);
}

function * watchFetchEventWinners(){
  yield takeEvery( FETCH_EVENT_WINNERS, fetchEventWinnersProcess);
}

function * watchFetchMyEvents(){
  yield takeEvery( FETCH_MY_EVENTS, fetchMyEventsProcess);
}

function * watchFetchWonEvents(){
  yield takeEvery( FETCH_WON_EVENTS, fetchWonEventsProcess);
}

function * watchFetchWonEventDetail(){
  yield takeEvery( FETCH_WON_EVENT_DETAIL, fetchWonEventDetailProcess);
}

function * watchFetchValidatedSponsors(){
  yield takeEvery( FETCH_VALIDATED_SPONSORS , fetchValidatedSponsorsProcess);
}

function * watchPostEventSponsor(){
  yield takeEvery( POST_EVENT_SPONSOR , postEventSponsorProcess);
}


function * watchSetEventPaid(){
  yield takeEvery( SET_EVENT_PAID, setEventPaidProcess);
}

function * watchFetchEventPrizes(){
  yield takeEvery(FETCH_EVENT_PRIZES, fetchEventPrizesProcess)
}

function * watchPostEventPrize(){
  yield takeEvery(POST_EVENT_PRIZE, postEventPrizeProcess)
}

function * watchDeleteEventPrize (){
  yield takeEvery(DELETE_EVENT_PRIZE, deleteEventPrizeProcess)

}

function * watchSetEventPrizes () {
  yield takeEvery(SET_EVENT_PRIZES, setEventPrizesProcess)
}

function * watchPostEventDrawWinners (){
  yield takeEvery(POST_EVENT_DRAW_WINNERS, postEventDrawWinnersProcess)
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
    fork(watchSuccess),
    fork(watchPostValidateMe),
    fork(watchFetchValidationRequests),
    fork(watchPostValidateCompany),
    fork(watchFetchValidationCompanyDetail),
    fork(watchSetLeafletPlace),
    fork(watchPostPlace),
    fork(watchPostValidatePlace),
    fork(watchDeleteSponsor),
    fork(watchFetchSponsorsToValidate),
    fork(watchPostValidateSponsor),
    fork(watchFinishEventBid),
    fork(watchFetchEventWinners),
    fork(watchFetchMyEvents),
    fork(watchFetchWonEvents),
    fork(watchFetchWonEventDetail),
    fork(watchFetchValidatedSponsors),
    fork(watchPostEventSponsor),
    fork(watchSetEventPaid),
    fork(watchFetchEventPrizes),
    
    fork(watchPostEventPrize),
    fork(watchDeleteEventPrize),
    fork(watchSetEventPrizes),

    fork(watchPostEventDrawWinners),

  ]);
}

export default rootSaga;
