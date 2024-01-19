import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC0R1aZtOGXWJYhWOhyxCVx9-M8J2DMGyw",
  authDomain: "moviehub-69ae2.firebaseapp.com",
  projectId: "moviehub-69ae2",
  storageBucket: "moviehub-69ae2.appspot.com",
  messagingSenderId: "1024042821712",
  appId: "1:1024042821712:web:516cae511202f5a2118955"
};


const app = initializeApp(firebaseConfig);
export const  db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");


export default app;