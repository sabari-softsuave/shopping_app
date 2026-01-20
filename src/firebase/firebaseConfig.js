import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyCmcOpM5tXFpk2EKZBMP9PxzF7QeNpQ_2c",
  authDomain: "react-native-1b407.firebaseapp.com",
  projectId: "react-native-1b407",
  storageBucket: "react-native-1b407.firebasestorage.app",
  messagingSenderId: "14533351723",
  appId: "1:14533351723:web:cf590c69fd9ecb1626cd6e",
  measurementId: "G-KN3PCK1GLB"
};



const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
