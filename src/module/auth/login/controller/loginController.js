import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'

const loginController = () => () => {
  const router = useRouter()
  const { login, user } = useAuth()
  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  const onLogin = async () => {
    loading.value = true
    await login(email.value, password.value)
    loading.value = false

    if (user.value) router.push('/')
  }

  return {
    email,
    password,
    loading,
    onLogin,
  }
}

export default loginController
