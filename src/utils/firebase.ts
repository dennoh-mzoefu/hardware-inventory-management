// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcZTmYmGjVR6JqNqPlcFPJyR0os2nN44U",
  authDomain: "hardware-b7d61.firebaseapp.com",
  projectId: "hardware-b7d61",
  storageBucket: "hardware-b7d61.appspot.com",
  messagingSenderId: "561401559323",
  appId: "1:561401559323:web:8dc7528ee7d3b161a33bbe",
  measurementId: "G-VP2684ST1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);

// collection ref

export const expenseColRef = collection(db, "expense");
export const stockColRef = collection(db, "stock");
export const salesColRef = collection(db, "sales");
export const ordersColRef = collection(db, "orders");
