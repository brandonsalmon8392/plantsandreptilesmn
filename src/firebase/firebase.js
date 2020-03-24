import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC9uRtueUU9jBWHrXI-09Kxrg7oBEc5dkQ",
    authDomain: "reptile-mn.firebaseapp.com",
    databaseURL: "https://reptile-mn.firebaseio.com",
    projectId: "reptile-mn",
    storageBucket: "reptile-mn.appspot.com",
    messagingSenderId: "130065925724",
    appId: "1:130065925724:web:ca2848afd138c64d3f8899",
    measurementId: "G-7P15S41PDB"
};
export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;


