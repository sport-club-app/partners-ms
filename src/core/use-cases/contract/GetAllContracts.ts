import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@Repository/ContractRepositoryDb"

export class GetAllContracts {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute () {
      return this.contractRepository.find()
    }
}
