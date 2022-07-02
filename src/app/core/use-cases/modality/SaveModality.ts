import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { Modality } from "@/app/core/entity"

export class SaveModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (modalities: Modality[]) {
      return this.modalityRepository.createMany(modalities)
    }
}
