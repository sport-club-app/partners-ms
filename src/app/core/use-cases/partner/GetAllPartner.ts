import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"

export class GetAllPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute () {
      const result = await this.partnerRepository.find()
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND
        )
      }
      return result
    }
}
