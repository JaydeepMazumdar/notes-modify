import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCIaZoKFXvJ4fB9DPzPMliypXSheFKOamw",
  authDomain: "fir-notes-0081.firebaseapp.com",
  projectId: "fir-notes-0081",
  storageBucket: "fir-notes-0081.appspot.com",
  messagingSenderId: "506204578508",
  appId: "1:506204578508:web:2e177a9159770504ca5869",
  measurementId: "G-RG014E71CW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, auth, db };
