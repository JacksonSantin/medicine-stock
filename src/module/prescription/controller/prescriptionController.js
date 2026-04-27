// import { useSnackbar } from '@/composables/useSnackbar'
import { shallowRef } from 'vue'

const prescriptionController = (usecase) => () => {
  // const snackbar = useSnackbar()
  const component = shallowRef()

  const back = async () => {
    const module = await import('@/module/medicines/view/medicines.vue')
    component.value = module.default
  }

  return {
    component,
    back,
  }
}

export default prescriptionController
