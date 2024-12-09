
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDIeZRQqemMdgMhvZLnVPMcTaX5fDazbro",
  authDomain: "mini-blogp.firebaseapp.com",
  projectId: "mini-blogp",
  storageBucket: "mini-blogp.firebasestorage.app",
  messagingSenderId: "972228135703",
  appId: "1:972228135703:web:0cd058944dd582de948552"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db};