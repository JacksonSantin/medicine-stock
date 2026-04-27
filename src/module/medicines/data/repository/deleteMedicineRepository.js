const deleteMedicineRepository = (axios) => async (id) => {
  try {
    const response = await axios.delete(`/medicines/${id}`)
    return response.data
  } catch (error) {
    throw error    
  }
}

export default deleteMedicineRepository
