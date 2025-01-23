import { initializeApp, getApps, cert } from 'firebase-admin/app'
import { getDatabase } from 'firebase-admin/database'

const firebaseAdminConfig = {
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  }),
  databaseURL: "https://pp-pulse-check-demo-default-rtdb.firebaseio.com"
}

// Initialize Firebase Admin
const firebase_app = !getApps().length ? initializeApp(firebaseAdminConfig) : getApps()[0]
const database = getDatabase(firebase_app)

export { database }