// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
//import * as firebase from 'firebase'

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBYzI8vSnUlZ_jvZIw3SN3TY7-xy9FOa8E",
  authDomain: "foodstore-login.firebaseapp.com",
  projectId: "foodstore-login",
  storageBucket: "foodstore-login.appspot.com",
  messagingSenderId: "322794049480",
  appId: "1:322794049480:web:24ced50298ebaecf393afd",
  measurementId: "G-2GR3D48FDL"
};

// Initialize Firebase

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase;
const analytics = getAnalytics(app);
// export  const firebaseApp = initializeApp(firebaseConfig);