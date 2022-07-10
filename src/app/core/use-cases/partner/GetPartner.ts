import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"

export class GetPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number) {
      if (!id) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC
        )
      }
      const result = await this.partnerRepository.findOne(id)
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
