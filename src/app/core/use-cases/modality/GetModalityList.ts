import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { Modality } from "@/app/core/entity"

export class GetModalityList {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (modalities: Modality[]) {
      const modalitiesList = []
      for (const md of modalities) {
        const result = await this.modalityRepository.findOne(md.id)
        modalitiesList.push(result)
      }
      return modalitiesList
    }
}
