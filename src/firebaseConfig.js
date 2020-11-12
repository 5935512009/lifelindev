import firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyCwdvYjGedXYwmv0kVvHZWW0gjzZ22YhbY",
    authDomain: "main-lifelinedev-16-9-2020.firebaseapp.com",
    databaseURL: "https://main-lifelinedev-16-9-2020.firebaseio.com",
    projectId: "main-lifelinedev-16-9-2020",
    storageBucket: "main-lifelinedev-16-9-2020.appspot.com",
    messagingSenderId: "273214855367",
    appId: "1:273214855367:web:f949feb737496553ad06e2",
    measurementId: "G-15W25S7XT7"
  };
  // Initialize Firebase
  export default firebase.initializeApp(firebaseConfig);