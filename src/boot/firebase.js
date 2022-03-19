import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyDw-Puo9YSZRjCXnQ0gZlfhjvUSJ5j0IzU",
  authDomain: "qwitter-app-fasz.firebaseapp.com",
  projectId: "qwitter-app-fasz",
  storageBucket: "qwitter-app-fasz.appspot.com",
  messagingSenderId: "626529745682",
  appId: "1:626529745682:web:91d6ff1e113fcda5e151cb",
  measurementId: "G-H39JHPXPTQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
//const analytics = getAnalytics();

export  {db}
