import { ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import {
  DeleteModality,
  GetAllmodality,
  GetModality,
  SaveModality,
  UpdateModality
} from "@/app/core/use-cases/modality"

export const modalityContainer = () => {
  const modalityRepository = new ModalityRepositoryDb()
  const getAllModalityUseCase = new GetAllmodality(modalityRepository)
  const getModalityUseCase = new GetModality(modalityRepository)
  const saveModalityUseCase = new SaveModality(modalityRepository)
  const deleteModalityUseCase = new DeleteModality(modalityRepository)
  const updateModalityUseCase = new UpdateModality(modalityRepository)

  return {
    getAllModalityUseCase,
    getModalityUseCase,
    saveModalityUseCase,
    deleteModalityUseCase,
    updateModalityUseCase
  }
}
