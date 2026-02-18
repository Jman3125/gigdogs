/* eslint-disable prettier/prettier */
import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  // @ts-ignore: getReactNativePersistence exists in the RN bundle
  // but is often missing from public TypeScript definitions.
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase config
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_APIKEY,
  authDomain: process.env.EXPO_PUBLIC_AUTHDOMAIN,
  projectId: process.env.EXPO_PUBLIC_PROJECTID,
  storageBucket: process.env.EXPO_PUBLIC_STORAGEBUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_MESSAGINGSENDERID,
  appId: process.env.EXPO_PUBLIC_APPID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const persistence = getReactNativePersistence(AsyncStorage);

// Initialize Auth with native persistence (required for EAS builds)
const auth = initializeAuth(app, {
  persistence,
});

const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };

