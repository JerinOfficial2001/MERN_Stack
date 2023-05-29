// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjeRJiwaSDzrKTAofafgeFlEYzFG7xsl8",
  authDomain: "mernstack-a814a.firebaseapp.com",
  projectId: "mernstack-a814a",
  storageBucket: "mernstack-a814a.appspot.com",
  messagingSenderId: "1004538589135",
  appId: "1:1004538589135:web:837ea9f9b9fb5ec7712cba",
  measurementId: "G-WHKTH0FMFJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default app;
