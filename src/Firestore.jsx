
import { initializeApp } from "firebase/app";
import {collection, getDocs, getFirestore,addDoc} from "firebase/firestore"
import{getAuth, GoogleAuthProvider} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "AIzaSyAjz5t487M9N9s4EmIuMLXDNuB-9via-Ak",
  authDomain: "todo-e9ed9.firebaseapp.com",
  projectId: "todo-e9ed9",
  storageBucket: "todo-e9ed9.appspot.com",
  messagingSenderId: "953939943380",
  appId: "1:953939943380:web:8e59d92be6e48f6220c041"
};
 export const app = initializeApp(firebaseConfig);

export let db=getFirestore(app)
 export let colref=collection(db,'books')
 export let auth=getAuth(app)
 export const provider = new GoogleAuthProvider();
