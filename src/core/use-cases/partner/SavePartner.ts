import { Partner } from "@Core/entity"
import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"

export class SavePartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (partner: Partner) {
      return this.partnerRepository.create(partner)
    }
}
