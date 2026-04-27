import axiosInstance from '@/plugins/axios'
import medicinesController from '../controller/medicinesController'

import getMedicinesRepository from '../data/repository/getMedicinesRepository'
import getMedicinesUseCase from '../domain/usecase/getMedicinesUseCase'

import deleteMedicineRepository from '../data/repository/deleteMedicineRepository'
import deleteMedicineUseCase from '../domain/usecase/deleteMedicineUseCase'

import createMedicineRepository from '../data/repository/createMedicineRepository'
import updateMedicineRepository from '../data/repository/updateMedicineRepository'
import saveMedicineUseCase from '../domain/usecase/saveMedicineUseCase'

const getMedicinesRepositoryImpl = getMedicinesRepository(axiosInstance)
const getMedicinesUseCaseImpl = getMedicinesUseCase({
  getMedicinesRepository: getMedicinesRepositoryImpl,
})

const deleteMedicineRepositoryImpl = deleteMedicineRepository(axiosInstance)
const deleteMedicineUseCaseImpl = deleteMedicineUseCase({
  deleteMedicineRepository: deleteMedicineRepositoryImpl,
})

const createMedicineRepositoryImpl = createMedicineRepository(axiosInstance)
const updateMedicineRepositoryImpl = updateMedicineRepository(axiosInstance)
const saveMedicineUseCaseImpl = saveMedicineUseCase({
  createMedicineRepository: createMedicineRepositoryImpl,
  updateMedicineRepository: updateMedicineRepositoryImpl,
})

export const medicinesControllerImpl = medicinesController({
  getMedicinesUseCase: getMedicinesUseCaseImpl,
  deleteMedicineUseCase: deleteMedicineUseCaseImpl,
  saveMedicineUseCase: saveMedicineUseCaseImpl,
})
