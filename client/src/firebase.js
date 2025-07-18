import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "Enter Your Key",
  authDomain: "As per your app",
  projectId: "As per your app",
  storageBucket: "As per your app",
  messagingSenderId: "As per your app",
  appId: "As per your app",
  measurementId: "As per your app"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Only declare once and export
