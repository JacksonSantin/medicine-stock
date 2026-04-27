const saveMedicineUseCase = (repository) => async (payload) => {
  try {
    const isEdit = !!payload._id

    if (isEdit) {
      await repository.updateMedicineRepository(payload.toSave())
    } else {
      await repository.createMedicineRepository(payload.toSave())
    }
  } catch (error) {
    throw error
  }
}

export default saveMedicineUseCase
