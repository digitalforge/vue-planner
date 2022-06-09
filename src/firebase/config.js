import { initializeApp } from "firebase/app"
import { getFirestore, serverTimestamp } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCr9k2bFe1QX74RD-C2ZLzFfH992JfnsHw",
  authDomain: "project-planner-de616.firebaseapp.com",
  projectId: "project-planner-de616",
  storageBucket: "project-planner-de616.appspot.com",
  messagingSenderId: "831732401704",
  appId: "1:831732401704:web:33f72d4638727626ddd71d",
}

//Initialize Firebase
const app = initializeApp(firebaseConfig)

// init firestore service
const auth = getAuth(app)
const db = getFirestore(app)
const timestamp = serverTimestamp()
const storage = getStorage(app)
const sRef = ref

// export firestore
export { db, auth, timestamp, storage, sRef, uploadBytes, getDownloadURL }
