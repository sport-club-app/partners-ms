import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"

export class GetFullRegisterDataPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number, relations: Array<"contacts" | "modalities" | "contracts">) {
      const result = await this.partnerRepository.findRelationsOne(id, relations)
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.PARTNER_NOT_FOUND,
          undefined
        )
      }
      return result
    }
}
