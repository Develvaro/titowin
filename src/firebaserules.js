service cloud.firestore {
  match /databases/{database}/documents {
    
    function isTheManager(eventID){
    			return get(/databases/$(database)/documents/Usuario/$(request.auth.uid)).data.manage == getEventPlace(eventID);
    }
    
    function isTheWinner(wonid){
    			return get(/databases/$(database)/documents/Usuario/$(request.auth.uid)/WonEvents/$(wonid)).exists; 
        }
  	
    function isPaid(wonid){
      return get(/databases/$(database)/documents/Usuario/$(request.auth.uid)/WonEvents/$(wonid)).data.pagado; 
    }
    
    function isValidatedSponsor(sponsorID){
      return get(/databases/$(database)/documents/Sponsor/$(sponsorID)).data.validado;
    }
    
    function userSignedIn(){
    	return request.auth.uid != null
    }
    
    function sameUser(userID){
    	return request.auth.uid == userID;
    }
    
  	function isAdmin(){
    	return (getTipo() == "admin")
    }
    
    function isCompany(){
        	return (getTipo() == "empresa");
    }
    
    function isManager(){
    	return (getTipo() == "manager");
    }
    
    function getEventPlace(eventID){
			return get(/databases/$(database)/documents/Evento/$(eventID)).data.lugar;
		}
    
    function getTipo(){
			return get(/databases/$(database)/documents/Usuario/$(request.auth.uid)).data.tipo;
    }
    
    function isValidated(){
			return get(/databases/$(database)/documents/Usuario/$(request.auth.uid)).data.validado;
    }
    
    match /Usuario/{userID} {
    	allow read: if sameUser(userID);
      
      allow create: if sameUser(userID) 
      	&&	request.resource.data.tipo == "empresa"
      	&&	request.resource.data.validado == false
        &&	request.resource.data.manager == false;
      
      allow update: if sameUser(userID)
      	&&	request.resource.data.tipo == resource.data.tipo
        &&	request.resource.data.validado == resource.data.validado
        &&	request.resource.data.manager == resource.data.manager;
  
    }
    
    match /Ciudad/{id} {
    	allow read, write;
    }
    
    match /Pais/{id} {
    	allow read,write;
    }
    
    match /Lugar/{id} {
    	allow read,write;
    }
    
  	match /Evento/{eventID} {
    	allow create: if 	request.resource.data.lugar != null
      	&&	request.resource.data.lugar == get(/databases/$(database)/documents/Usuario/$(request.auth.uid)).data.manage;
      allow read;
      allow update: if isTheManager(eventID)
    }

function isThrottled(time) {
  return request.time < time + duration.value(10, 's')
		}

function isFinished(time){
	return request.time > time + duration.value(2, 's')
}
    match /Evento/{eventID}/Puja/{pujaID} {
    	allow create: if (isCompany()
				&& !isFinished(get(/databases/$(database)/documents/Evento/$(eventID)).data.bidDate)
        && isThrottled(request.resource.data.time)
        
        )

        || isTheManager(eventID);
    	allow read;
    }
    
    
        
    match /Evento/{id}/Winners/{wonid}{
    	allow read;
      allow create: if isTheManager(id)
      	&& getAfter(/databases/$(database)/documents/Usuario/$(request.resource.data.userID)/WonEvents/$(request.resource.data.winnerID)).data.pagado == false
        && getAfter(/databases/$(database)/documents/Evento/$(id)).data.estado == "bidfinished";

    }
    
    match /Usuario/{id}/WonEvents/{wonid}{
    	
      allow read;
      allow create: if isTheManager(request.resource.data.evento) 
      	&& request.resource.data.pagado == false
      	&& getAfter(/databases/$(database)/documents/Evento/$(request.resource.data.evento)/Winners/$(wonid)).exists
				&& getAfter(/databases/$(database)/documents/Evento/$(request.resource.data.evento)).data.estado == "bidfinished"
      allow update: if (isTheManager(resource.data.evento)
      	&& getAfter(/databases/$(database)/documents/Evento/$(request.resource.data.evento)).data.estado == "paid")
        || (isTheWinner(wonid) && resource.data.pagado  && request.resource.data.hasSponsor
      	&& isValidatedSponsor(getAfter(/databases/$(database)/documents/Evento/$(resource.data.evento)/Winners/$(wonid)).data.sponsor)
        )

    }
    
    match /Sponsors/{id}{
    		allow read;
    		allow create: if (isCompany() && request.resource.data.validado == false);
				allow delete:if isAdmin()
        || ( resource.data.user == request.auth.uid && resource.data.validado == false);
        
        allow update : if (isAdmin());
         
			}
    

  }
}



     // allow read: if sameUser(id) || isManager(); && request.resource.data.size() == 1
      //allow create; && request.resource.data.size() == 1
      //allow update: if isTheManager(getAfter(
      ///databases/$(database)/documents/Usuario/$(id)/WonEvents/$(eventID)).data.evento);

//if ( isTheManager(request.resource.data.evento) && request.resource.data.pagado == false);