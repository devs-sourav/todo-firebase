import { initializeApp } from "firebase/app";

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyBM8diClAPhN8WG4RrssSO_W6rzwe_Rrxw",

  authDomain: "todo-82596.firebaseapp.com",

  databaseURL: "https://todo-82596-default-rtdb.firebaseio.com",

  projectId: "todo-82596",

  storageBucket: "todo-82596.appspot.com",

  messagingSenderId: "713271796564",

  appId: "1:713271796564:web:a8b9a30dc8061e2e8c1ec1"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default firebaseConfig