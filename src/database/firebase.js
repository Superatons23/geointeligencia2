// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVDTBGdQ49SxDLTdWO8FxfqjbENfKzm5U",
  authDomain: "geointeligencia-38834.firebaseapp.com",
  projectId: "geointeligencia-38834",
  storageBucket: "geointeligencia-38834.appspot.com",
  messagingSenderId: "405591196998",
  appId: "1:405591196998:web:3d8f7912931a2e41f41147",
  measurementId: "G-BKY277RN6R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export default app;
