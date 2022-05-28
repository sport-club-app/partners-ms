import { IPartnerRepositoryDbMethods, PartnerRepositoryDb } from "@Repository/PartnerRepositoryDb"

export class DeletePartner {
    private partnerRepository: IPartnerRepositoryDbMethods
    constructor (partnerRepository: PartnerRepositoryDb) {
      this.partnerRepository = partnerRepository
    }

    async execute (id: number) {
      return this.partnerRepository.delete(id)
    }
}
