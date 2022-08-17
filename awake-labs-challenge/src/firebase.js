// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCz0ZGJZ5nIKIaKUKZcSk5lFbVxB727xw4",
    authDomain: "awake-labs-challenge.firebaseapp.com",
    projectId: "awake-labs-challenge",
    storageBucket: "awake-labs-challenge.appspot.com",
    messagingSenderId: "40171270308",
    appId: "1:40171270308:web:fce4af9ac384566c33b631"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;