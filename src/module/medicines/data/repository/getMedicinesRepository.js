import Medicine from '../../domain/model/medicine'

const getMedicinesRepository = (axios) => async (search) => {
  try {
    const response = await axios.get('/medicines', { params: search })
    const medicines =
      response.data?.medicines?.map((med) => new Medicine({ ...med })) ?? []

    medicines.sort((a, b) =>
      a.nome_remedio.localeCompare(b.nome_remedio, 'pt-BR', { sensitivity: 'base' })
    )

    return medicines
  } catch (error) {
    throw error
  }
}

export default getMedicinesRepository
