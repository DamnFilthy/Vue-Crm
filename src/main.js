import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'materialize-css/dist/js/materialize.min.js'
import firebase from "firebase/compat";

const firebaseConfig = {
    apiKey: "AIzaSyA16FA_BW_cxhRa9dkW7biRTcqrIkONvkE",
    authDomain: "vue-crm-b43b4.firebaseapp.com",
    projectId: "vue-crm-b43b4",
    storageBucket: "vue-crm-b43b4.appspot.com",
    messagingSenderId: "434982337878",
    appId: "1:434982337878:web:796e30bb11a7c403af6af7",
    measurementId: "G-8524KFQR3N"
};

firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged( () => {
    createApp(App).use(store).use(router).mount('#app')
})
