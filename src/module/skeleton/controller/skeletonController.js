import { onMounted, ref, shallowRef } from 'vue'
import { useRouter } from 'vue-router'
import { useTheme } from 'vuetify'
import useAuth from '@/composables/useAuth'

const skeletonController = () => () => {
  const component = shallowRef()
  const router = useRouter()
  const theme = useTheme()
  const themeName = ref(localStorage.getItem('theme') || 'light')
  const { logout } = useAuth()
  const activeButton = ref('')

  onMounted(() => {
    theme.global.name.value = themeName.value
    navigate('medicines')
  })

  const navigate = async (name) => {
    activeButton.value = name
    component.value = (await import(`@/module/${name}/view/${name}.vue`)).default
  }

  const toggleTheme = () => {
    themeName.value = theme.global.current.value.dark ? 'light' : 'dark'
    theme.global.name.value = themeName.value
    localStorage.setItem('theme', themeName.value)
  }

  const handleLogout = async () => {
    await logout()
    localStorage.getItem('theme') ?? 'light'
    router.push('/login')
  }

  return {
    themeName,
    activeButton,
    component,
    navigate,
    toggleTheme,
    handleLogout,
  }
}

export { skeletonController }
