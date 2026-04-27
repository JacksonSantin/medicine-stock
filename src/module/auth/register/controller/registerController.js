import { ref } from 'vue'
import { useRouter } from 'vue-router'
import useAuth from '@/composables/useAuth'

const registerController = () => () => {
  const router = useRouter()
  const { register, user } = useAuth()
  const email = ref('')
  const password = ref('')
  const loading = ref(false)

  const onRegister = async () => {
    loading.value = true
    await register(email.value, password.value)
    loading.value = false

    if (user.value) router.push('/')
  }

  return {
    email,
    password,
    loading,
    onRegister,
  }
}

export default registerController
