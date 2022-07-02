import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"

export class DeleteContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number, partnerId: number) {
      return this.contractRepository.deleteWithPartner(id, partnerId)
    }
}
