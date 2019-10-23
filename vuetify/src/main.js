import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import vuetify from './plugins/vuetify'
import { sync } from 'vuex-router-sync'
// import firebase from 'firebase'
// import 'firebase/firestore'

sync(store, router)

Vue.config.productionTip = false
// const firebaseConfig = {
//   apiKey: 'AIzaSyB7HtnfywFg3ql3wy9rbAYmJA9gEhMMMms',
//   authDomain: 'vuejs-firebase-3e467.firebaseapp.com',
//   databaseURL: 'https://vuejs-firebase-3e467.firebaseio.com',
//   projectId: 'vuejs-firebase-3e467',
//   storageBucket: '',
//   messagingSenderId: '516041679491',
//   appId: '1:516041679491:web:6d8d970471d6e8b83771b6'
// }

// firebase.initializeApp(firebaseConfig)


// export const db = firebase.firestore()

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
