import { ref, computed } from 'vue'
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  getIdToken,
} from 'firebase/auth'
import { auth, authState } from '@/plugins/firebase'

export default function useAuth() {
  const user = computed(() => authState.currentUser)
  const loading = computed(() => authState.loading)
  const error = ref(null)

  const login = async (email, password) => {
    error.value = null
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (err) {
      error.value = err.message
    }
  }

  const register = async (email, password) => {
    error.value = null
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (err) {
      error.value = err.message
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  const getToken = async () => {
    const u = auth.currentUser
    if (!u) return null
    return await getIdToken(u)
  }

  return { user, loading, error, login, register, logout, getToken }
}
