import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


const firebaseConfig = {
  apiKey: "AIzaSyDPr6Ju4sj5qh0s9yrhH_kH6c33yA_NyRU",
  authDomain: "examensarbete-5fe9b.firebaseapp.com",
  projectId: "examensarbete-5fe9b",
  storageBucket: "examensarbete-5fe9b.appspot.com",
  messagingSenderId: "1026112094277",
  appId: "1:1026112094277:web:1cb3feed908f1963e0632c"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the Firestore database
const db = firebase.firestore();

// Get a reference to the Firebase Authentication service
const auth = firebase.auth();

// Initialize Firebase Authentication and get a reference to the service
export { db, auth };
export default firebase;

