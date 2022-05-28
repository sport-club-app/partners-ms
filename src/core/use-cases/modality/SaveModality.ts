import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"
import { Modality } from "@Core/entity"

export class SaveModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (modalities: Modality[]) {
      return this.modalityRepository.createMany(modalities)
    }
}
