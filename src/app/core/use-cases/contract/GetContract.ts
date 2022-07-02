import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"

export class GetContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number) {
      return this.contractRepository.findOne(id)
    }
}
