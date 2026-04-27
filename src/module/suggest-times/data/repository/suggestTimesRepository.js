const suggestTimesRepository = (axios) => async (payload) => {
  const response = await axios.post('/medicines/suggest-times', payload)

  return response.data?.result ?? []
}

export default suggestTimesRepository
