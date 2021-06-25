import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyAuLEs9g0TdVFK8yTCfLR5xc2IkcCniBt4",
    authDomain: "githubcards-fafdb.firebaseapp.com",
    projectId: "githubcards-fafdb",
    storageBucket: "githubcards-fafdb.appspot.com",
    messagingSenderId: "535757103401",
    appId: "1:535757103401:web:ee1964dbbc188c76861738",
    measurementId: "G-MDWTZ3FX8M"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();

  export default db;