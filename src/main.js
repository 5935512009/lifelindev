import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/styles/app.css'
// import firebase from 'firebase'
import './plugins/element.js'

Vue.config.productionTip = false;

// var firebaseConfig = {
//   apiKey: "AIzaSyCwdvYjGedXYwmv0kVvHZWW0gjzZ22YhbY",
//   authDomain: "main-lifelinedev-16-9-2020.firebaseapp.com",
//   databaseURL: "https://main-lifelinedev-16-9-2020.firebaseio.com",
//   projectId: "main-lifelinedev-16-9-2020",
//   storageBucket: "main-lifelinedev-16-9-2020.appspot.com",
//   messagingSenderId: "273214855367",
//   appId: "1:273214855367:web:f949feb737496553ad06e2",
//   measurementId: "G-15W25S7XT7"
// };
// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
