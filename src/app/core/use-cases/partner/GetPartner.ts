import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@/app/repository/PartnerRepositoryDb"

export class GetPartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number) {
      return this.partnerRepository.findOne(id)
    }
}
