import { initializeApp, getApps, FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

let app: FirebaseApp | null = null
export function getFirebase(){
  if(!app && typeof window!=="undefined"){
    const cfg = {
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    }
    if (cfg.apiKey) app = getApps()[0] || initializeApp(cfg)
  }
  return app
}
export const getDb = () => (getFirebase() ? getFirestore(getFirebase()!) : null)
export const getFirebaseAuth = () => (getFirebase() ? getAuth(getFirebase()!) : null)
export const getFirebaseStorage = () => (getFirebase() ? getStorage(getFirebase()!) : null)