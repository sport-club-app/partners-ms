import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"
import { Modality } from "@Core/entity"

export class UpdateModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (id: number, modality: Modality) {
      return this.modalityRepository.update(id, modality)
    }
}
