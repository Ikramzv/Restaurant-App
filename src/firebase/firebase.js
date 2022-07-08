import { initializeApp , getApp , getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBtp8SZJXwZ59kPxGC85Wucptd3uifpKMM",
  authDomain: "restaurantapp-8b66c.firebaseapp.com",
  databaseURL: "https://restaurantapp-8b66c-default-rtdb.firebaseio.com",
  projectId: "restaurantapp-8b66c",
  storageBucket: "restaurantapp-8b66c.appspot.com",
  messagingSenderId: "721970600330",
  appId: "1:721970600330:web:31554f217993bd81061073"
};


const app  = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig)
const firestore = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export { app , firestore , storage , provider , auth};