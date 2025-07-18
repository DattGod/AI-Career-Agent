import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCq5Py4Wup9bDQjgezv-LaIVw-hsRHuu_M",
  authDomain: "ai-career-agent-a6d81.firebaseapp.com",
  projectId: "ai-career-agent-a6d81",
  storageBucket: "ai-career-agent-a6d81.firebasestorage.app",
  messagingSenderId: "1074276047765",
  appId: "1:1074276047765:web:efa735052e1ddceaeaf49c",
  measurementId: "G-9CKCHEK42R"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // ✅ Only declare once and export
