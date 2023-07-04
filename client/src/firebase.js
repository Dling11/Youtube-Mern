import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCfLqGTL6wuF6Ml3tB6CoJGCKjTOBm1S7E",
  authDomain: "video-674e3.firebaseapp.com",
  projectId: "video-674e3",
  storageBucket: "video-674e3.appspot.com",
  messagingSenderId: "878536484053",
  appId: "1:878536484053:web:b759e8a657b9f07e0c6e5c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const provider = new GoogleAuthProvider(); // this is the google auth | login using google account

export default app;