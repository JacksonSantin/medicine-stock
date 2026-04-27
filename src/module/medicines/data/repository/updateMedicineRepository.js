const updateMedicineRepository = (axios) => async (payload) => {
  try {
    const response = await axios.put(`/medicines/${payload._id}`, payload)
    return response.data ?? {}
  } catch (error) {
    throw error
  }
}

export default updateMedicineRepository
