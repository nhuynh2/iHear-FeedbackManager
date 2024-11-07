import { Platform } from "react-native";

import iosData from "./GoogleService-Info.json";
import androidData from "./google-services.json";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

let firebaseConfig = {
  apiKey: "apiKey",
  authDomain: "authDomain",
  projectId: "projectId",
  storageBucket: "storageBucket",
  messagingSenderId: "messagingSenderId",
  appId: "appId",
};

if (Platform.OS == "ios") {
  firebaseConfig = {
    apiKey: iosData.API_KEY,
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: iosData.PROJECT_ID,
    storageBucket: iosData.STORAGE_BUCKET,
    messagingSenderId: iosData.GCM_SENDER_ID,
    appId: iosData.GOOGLE_APP_ID,
  };
} else if (Platform.OS == "android") {
  firebaseConfig = {
    apiKey: androidData.client[0].api_key[0].current_key,
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: androidData.project_info.project_id,
    storageBucket: androidData.project_info.storage_bucket,
    messagingSenderId: androidData.project_info.project_number,
    appId: androidData.client[0].client_info.mobilesdk_app_id,
  };
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const firestore = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

// Optionally export the app itself
export default app;
