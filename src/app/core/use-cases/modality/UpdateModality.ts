import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { Modality } from "@/app/core/entity"

export class UpdateModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (id: number, modality: Modality) {
      return this.modalityRepository.update(id, modality)
    }
}
