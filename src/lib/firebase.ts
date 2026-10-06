import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyB53w8Yu0xOx5jO4YftWawBVGICKGDeSS4",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "shalomglobal-6895d.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "shalomglobal-6895d",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "shalomglobal-6895d.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "986496001447",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:986496001447:web:518968584579f0398c0282",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-69GGFHTTFZ"
};

// Initialize Firebase safely for Next.js SSR / client
const app: FirebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  try {
    isSupported()
      .then((supported) => {
        if (supported) {
          try {
            analytics = getAnalytics(app);
          } catch (e) {
            // Ignore
          }
        }
      })
      .catch(() => {});
  } catch (e) {
    // Ignore
  }
}

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);

export { app, auth, db, analytics, firebaseConfig };
