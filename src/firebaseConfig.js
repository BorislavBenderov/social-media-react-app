import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyC-mLAJJYunkKmgVi0-hQEGPE5S22TUvU0",
  authDomain: "social-media-react-app-401bc.firebaseapp.com",
  projectId: "social-media-react-app-401bc",
  storageBucket: "social-media-react-app-401bc.appspot.com",
  messagingSenderId: "16754577876",
  appId: "1:16754577876:web:d488e411b5b57d65060641"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);