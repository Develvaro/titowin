
import * as firebase from "firebase";

import { FirebaseConfig } from "../config/keys";
firebase.initializeApp(FirebaseConfig);

const settings = {
    timestampsInSnapshots : true
};

firebase.firestore().settings(settings);

export const databaseRef = firebase.firestore();
