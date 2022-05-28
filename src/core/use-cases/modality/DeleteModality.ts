import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@Repository/ModalityRepositoryDb"

export class DeleteModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (id: number) {
      return this.modalityRepository.delete(id)
    }
}
