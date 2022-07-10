import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { IModalityRepositoryDbMethods, ModalityRepositoryDb } from "@/app/repository/ModalityRepositoryDb"

export class GetModality {
    private modalityRepository: IModalityRepositoryDbMethods
    constructor (modalityRepository: ModalityRepositoryDb) {
      this.modalityRepository = modalityRepository
    }

    async execute (id: number) {
      if (!id) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      }
      const result = await this.modalityRepository.findOne(id)
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
