import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"

export class GetAllPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute () {
      return this.partnerRepository.find()
    }
}
