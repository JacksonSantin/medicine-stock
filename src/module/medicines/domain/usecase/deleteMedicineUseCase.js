const deleteMedicineUseCase = (repository) => async (id) => {
  try {
    return await repository.deleteMedicineRepository(id)
  } catch (error) {
    throw error
  }
}

export default deleteMedicineUseCase
