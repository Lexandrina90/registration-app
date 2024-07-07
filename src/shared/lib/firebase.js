// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkwcwqyf4y_f7CYGkoOI2MQHxwgPv93I4",
  authDomain: "registration-app-9adee.firebaseapp.com",
  projectId: "registration-app-9adee",
  storageBucket: "registration-app-9adee.appspot.com",
  messagingSenderId: "91852146442",
  appId: "1:91852146442:web:8a01562504dd64d1d11cf3",
  measurementId: "G-W0L6MKHN5C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

