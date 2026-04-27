import axios from 'axios'
import { auth } from '@/plugins/firebase'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_MEDICINE_STOCK_API_URL,
  withCredentials: true,
})

axiosInstance.interceptors.request.use(async (config) => {
  const user = auth.currentUser
  if (user) {
    const token = await user.getIdToken()
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default axiosInstance
