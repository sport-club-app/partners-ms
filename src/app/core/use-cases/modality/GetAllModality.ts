import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"

export class GetAllmodality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute () {
      return this.modalityRepository.find()
    }
}
