import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
    apiKey: "AIzaSyBmISe2hf428NmBEujFesWaRT7y1L-Z_lQ",
    authDomain: "gymtracker-c5f99.firebaseapp.com",
    databaseURL: "https://gymtracker-c5f99-default-rtdb.firebaseio.com",
    projectId: "gymtracker-c5f99",
    storageBucket: "gymtracker-c5f99.firebasestorage.app",
    messagingSenderId: "280993750329",
    appId: "1:280993750329:web:b42ef44a80283b29d15ce8",
    measurementId: "G-5YDQ7Y5BCN"
  };

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

export { auth };
