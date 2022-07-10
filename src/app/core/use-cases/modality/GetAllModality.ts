import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"

export class GetAllmodality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute () {
      const result = await this.modalityRepository.find()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.MODALITY_NOT_FOUND
        )
      }
      return result
    }
}
