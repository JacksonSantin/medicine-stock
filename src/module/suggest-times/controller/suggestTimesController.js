import { nextTick, ref } from 'vue'
import { useSnackbar } from '@/composables/useSnackbar'
import SuggestTimes from '../domain/model/suggestTimes'
import rules from '@/core/util/rules'

const suggestTimesController = (usecase) => () => {
  const snackbar = useSnackbar()
  const loading = ref(false)
  const formRef = ref(null)
  const suggest = ref(new SuggestTimes())
  const suggestedTimes = ref([])
  const rule = { ...rules }

  const save = async () => {
    if (loading.value) return

    try {
      const validForm = await validateForm()
      if (!validForm) return

      loading.value = true
      suggestedTimes.value = []

      const result = await usecase.suggestTimesUseCase(suggest.value)
      suggestedTimes.value = result

      snackbar.show({ message: 'Horários gerados com sucesso!', color: 'green', timeout: 3000 })

      resetValidationForm()
    } catch (error) {
      snackbar.show({ message: error })
    } finally {
      loading.value = false
    }
  }

  const resetValidationForm = async () => {
    await nextTick()
    formRef.value.resetValidation()
  }

  const validateForm = async () => {
    const { valid } = await formRef.value.validate()
    return valid
  }

  return {
    loading,
    formRef,
    suggest,
    suggestedTimes,
    rule,
    save,
  }
}

export default suggestTimesController
