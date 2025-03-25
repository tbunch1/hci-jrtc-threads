// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

import {
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  import { getFirestore, doc, getDoc, setDoc, updateDoc} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBn5dmo-s7BnDIm_8a46HY6dEAJi2CCYE0",

  authDomain: "threads-5e5bf.firebaseapp.com",

  projectId: "threads-5e5bf",

  storageBucket: "threads-5e5bf.firebasestorage.app",

  messagingSenderId: "403800038362",

  appId: "1:403800038362:web:0a8c1d2a592528b04ffee3",

  measurementId: "G-JQ93828F39"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
// console.log(db);

export { auth, createUserWithEmailAndPassword, provider, signInWithPopup, signOut, db, doc, getDoc, setDoc, updateDoc };
