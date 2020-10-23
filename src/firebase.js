import * as firebase from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB3TbgWOm1gAYJQ4h3PY4VBwx35-jh9ggg",
  authDomain: "nwitter-d14db.firebaseapp.com",
  databaseURL: "https://nwitter-d14db.firebaseio.com",
  projectId: "nwitter-d14db",
  storageBucket: "nwitter-d14db.appspot.com",
  messagingSenderId: "479277356163",
  appId: "1:479277356163:web:e3df2129eef47fd752f7b6",
};

// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
