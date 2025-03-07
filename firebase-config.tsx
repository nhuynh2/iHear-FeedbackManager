import { Platform } from "react-native";

import iosData from "./GoogleService-Info.json";
import androidData from "./google-services.json";

import { initializeApp } from "firebase/app";

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
    authDomain: `${iosData.PROJECT_ID}.firebaseapp.com`,
    projectId: iosData.PROJECT_ID,
    storageBucket: iosData.STORAGE_BUCKET,
    messagingSenderId: iosData.GCM_SENDER_ID,
    appId: iosData.GOOGLE_APP_ID,
  };
} else if (Platform.OS == "android") {
  firebaseConfig = {
    apiKey: androidData.client[0].api_key[0].current_key,
    authDomain: `${androidData.project_info.project_id}.firebaseapp.com`,
    projectId: androidData.project_info.project_id,
    storageBucket: androidData.project_info.storage_bucket,
    messagingSenderId: androidData.project_info.project_number,
    appId: androidData.client[0].client_info.mobilesdk_app_id,
  };
}

// Initialize Firebase
export default initializeApp(firebaseConfig);
