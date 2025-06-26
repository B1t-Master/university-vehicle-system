import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getDatabase, ref, push, onValue } from "firebase/database";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  collectionGroup,
  doc,
  updateDoc,
} from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCWcQRDjD6uMX_XCFh3TVJFYmwHxsoxcRE",
  authDomain: "is-1-7058f.firebaseapp.com",
  projectId: "is-1-7058f",
  storageBucket: "is-1-7058f.firebasestorage.app",
  messagingSenderId: "761925527013",
  appId: "1:761925527013:web:eb4d2d7d33da70e603fb0c",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
  where,
  collectionGroup,
  doc,
  updateDoc,
};
