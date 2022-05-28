import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"
import { Partner } from "@Core/entity"

export class UpdatePartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number, partner: Partner) {
      return this.partnerRepository.update(id, partner)
    }
}
