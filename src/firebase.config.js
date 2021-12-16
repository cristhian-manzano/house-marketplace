import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCYDjPQyXAihiELK39Llfs1Zw62AQOp8R0",
  authDomain: "house-marketplace-1b743.firebaseapp.com",
  projectId: "house-marketplace-1b743",
  storageBucket: "house-marketplace-1b743.appspot.com",
  messagingSenderId: "565901040289",
  appId: "1:565901040289:web:83b246431b3889494aaee0",
};

initializeApp(firebaseConfig);

export const db = getFirestore();
