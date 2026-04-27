import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { headers } from '../const/headers'
import { useSnackbar } from '@/composables/useSnackbar'
import { useAlert } from '@/composables/useAlert'
import { useDisplay } from 'vuetify'
import Medicine from '../domain/model/medicine'
import rules from '@/core/util/rules'
import dayjs from 'dayjs'

const medicinesController = (usecase) => () => {
  const snackbar = useSnackbar()
  const alert = useAlert()
  const display = useDisplay()
  const columns = ref(headers)
  const loading = ref(false)
  const dialogForm = ref(false)
  const readOnly = ref(false)
  const formRef = ref(null)
  const rows = ref([])
  const total = ref(0)
  const search = ref('')
  const medicine = ref(new Medicine())
  const rule = { ...rules }

  onMounted(async () => {
    await loadMedicines()
  })

  const isMobile = computed(() => {
    return display.smAndDown.value
  })

  let searchTimeout
  watch(search, (value) => {
    clearTimeout(searchTimeout)
    searchTimeout = setTimeout(() => {
      loadMedicines()
    }, 500)
  })

  watch(
    () => medicine.value.uso_continuo,
    (novoValor) => {
      if (!novoValor) {
        medicine.value.qtd_diaria = 0
      }
    },
  )

  const loadMedicines = async () => {
    try {
      loading.value = true

      const { items, count } = await usecase.getMedicinesUseCase(search.value)
      rows.value = items
      total.value = count
    } catch (error) {
      snackbar.show({ message: error })
    } finally {
      loading.value = false
    }
  }

  const add = () => {
    medicine.value = new Medicine()
    dialogForm.value = true
  }

  const show = (item) => {
    medicine.value = new Medicine({ ...item }).toCreate()
    readOnly.value = true
    dialogForm.value = true
  }

  const update = (item) => {
    medicine.value = new Medicine({ ...item }).toCreate()
    dialogForm.value = true
  }

  const remove = async (item) => {
    try {
      const confirm = await alert.confirm({
        message: `Deseja realmente excluir o registro?`,
        color: 'red',
      })

      if (!confirm) return

      loading.value = true

      await usecase.deleteMedicineUseCase(item._id)

      snackbar.show({
        message: 'Registro excluído com sucesso!',
        color: 'green',
        timeout: 2000,
      })

      loadMedicines()
    } catch (error) {
      snackbar.show({ message: error })
    } finally {
      loading.value = false
    }
  }

  const save = async () => {
    if (loading.value || readOnly.value) return

    try {
      const validForm = await validateForm()
      if (!validForm) return

      loading.value = true

      await usecase.saveMedicineUseCase(medicine.value)

      cancel()
      loadMedicines()
    } catch (error) {
      snackbar.show({ message: error })
    } finally {
      loading.value = false
    }
  }

  const cancel = () => {
    medicine.value = new Medicine()
    readOnly.value = false
    dialogForm.value = false
    resetValidationForm()
  }

  const resetValidationForm = async () => {
    await nextTick()
    formRef.value.resetValidation()
  }

  const validateForm = async () => {
    const { valid } = await formRef.value.validate()
    return valid
  }

  const getStatusChip = (type, value) => {
    if (type === 'validade') {
      if (!value) return { cor: '', texto: '', icone: '' }

      const today = dayjs().utc()
      const validade = dayjs.utc(value)

      if (
        validade.isBefore(today, 'month') ||
        (validade.month() === today.month() && validade.year() === today.year())
      ) {
        return { cor: 'red', texto: 'Vencido', icone: 'mdi-alert-circle' }
      }

      const diffDays = validade.diff(today, 'day')
      if (diffDays <= 30) {
        return { cor: 'orange', texto: 'Próximo do vencimento', icone: 'mdi-alert' }
      }

      return { cor: 'green', texto: 'Dentro do prazo', icone: 'mdi-check-circle' }
    }

    if (type === 'quantidade') {
      if (value <= 0) return { cor: 'red', texto: 'Acabou', icone: 'mdi-alert-circle' }
      if (value <= 5) return { cor: 'orange', texto: 'Quase acabando', icone: 'mdi-alert' }
      return { cor: 'green', texto: 'Quantidade ok', icone: 'mdi-check-circle' }
    }

    return { cor: '', texto: '', icone: '' }
  }

  return {
    columns,
    loading,
    dialogForm,
    readOnly,
    formRef,
    rows,
    total,
    search,
    medicine,
    rule,
    isMobile,
    add,
    show,
    update,
    remove,
    save,
    cancel,
    getStatusChip,
  }
}

export default medicinesController
