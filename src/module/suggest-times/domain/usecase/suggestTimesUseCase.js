const suggestTimesUseCase = (repository) => async (payload) => {
  return await repository.suggestTimesRepository(payload)
}

export default suggestTimesUseCase
