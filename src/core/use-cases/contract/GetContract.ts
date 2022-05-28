import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@Repository/ContractRepositoryDb"

export class GetContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number) {
      return this.contractRepository.findOne(id)
    }
}
