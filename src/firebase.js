import firebase from "firebase/compat/app"
import'firebase/compat/auth'
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";


require('firebase/auth')
const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID

})
export const db = getFirestore();
export const auth = app.auth();
export default app