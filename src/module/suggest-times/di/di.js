import suggestTimesController from '../controller/suggestTimesController'
import axiosInstance from '@/plugins/axios'

import suggestTimesRepository from '../data/repository/suggestTimesRepository'
import suggestTimesUseCase from '../domain/usecase/suggestTimesUseCase'

const suggestTimesRepositoryImpl = suggestTimesRepository(axiosInstance)
const suggestTimesUseCaseImpl = suggestTimesUseCase({
  suggestTimesRepository: suggestTimesRepositoryImpl,
})

export const suggestTimesControllerImpl = suggestTimesController({
  suggestTimesUseCase: suggestTimesUseCaseImpl,
})
