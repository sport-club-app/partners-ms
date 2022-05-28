import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"

export class GetFullRegisterDataPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number, relations: Array<"contacts" | "modalities" | "contracts">) {
      return this.partnerRepository.findRelationsOne(id, relations)
    }
}
