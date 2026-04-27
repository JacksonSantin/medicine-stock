import { reactive } from 'vue'

const state = reactive({
  message: '',
  show: false,
  color: 'red',
  timeout: 3000,
})

export const useSnackbar = () => {
  const show = (
    options = {
      message: '',
      color: 'red',
      timeout: 3000,
    },
  ) => {
    state.message = options.message
    state.show = true
    state.color = options.color || 'red'
    state.timeout = options.timeout || 3000

    setTimeout(() => {
      state.show = false
    }, state.timeout)
  }

  const close = () => {
    state.show = false
    state.message = ''
  }

  return {
    state,
    show,
    close,
  }
}
