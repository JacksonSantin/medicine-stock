import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { reactive } from 'vue'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

setPersistence(auth, browserLocalPersistence)

const authState = reactive({
  currentUser: null,
  loading: true,
})

onAuthStateChanged(auth, (user) => {
  authState.currentUser = user
  authState.loading = false
})

onIdTokenChanged(auth, (user) => {
  authState.currentUser = user
})

export { auth, authState }
