import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"
import { Partner } from "@/app/core/entity"

export class UpdatePartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number, partner: Partner) {
      return this.partnerRepository.update(id, partner)
    }
}
