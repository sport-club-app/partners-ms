import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"
import { Modality } from "@/app/core/entity"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"

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
      if (modalitiesList.length == 0) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.MODALITY_NOT_FOUND,
          undefined
        )
      }
      return modalitiesList
    }
}
