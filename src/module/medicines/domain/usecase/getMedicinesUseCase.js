const getMedicinesUseCase = (repository) => async (search) => {
  try {
    const params = {}

    if (search && search.trim()) {
      params.q = search.trim().toLowerCase()
    }

    const items = await repository.getMedicinesRepository(params)
    const count = items.length

    if (count === 0) {
      return {
        items: [],
        count,
      }
    }

    return {
      items,
      count,
    }
  } catch (error) {
    throw error
  }
}

export default getMedicinesUseCase
