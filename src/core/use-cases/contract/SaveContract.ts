import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@Repository/ContractRepositoryDb"
export class SaveContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (modalities: any, partnerId: number) {
      const dataContract = modalities.map(e => {
        return {
          ...e.contract,
          modalityId: e.id,
          partnerId: partnerId
        }
      })
      return this.contractRepository.create(dataContract)
    }
}
