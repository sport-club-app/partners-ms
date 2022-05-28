import { ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"
import {
  DeleteModality,
  GetAllmodality,
  GetModality,
  GetModalityList,
  SaveModality,
  UpdateModality
} from "@Core/use-cases/modality"

export const modalityFactory = () => {
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
