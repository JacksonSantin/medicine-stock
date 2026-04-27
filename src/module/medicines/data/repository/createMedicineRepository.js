export const createMedicineRepository = (axios) => async (payload) => {
  try {
    const response = await axios.post('/medicines', payload)
    return response.data ?? {}
  } catch (error) {
    throw error
  }
}

export default createMedicineRepository
