import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"

export class GetAllmodality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute () {
      return this.modalityRepository.find()
    }
}
