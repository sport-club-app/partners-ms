import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"

export class DeleteContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number, partnerId: number) {
      if (!partnerId) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return this.contractRepository.deleteWithPartner(id, partnerId)
    }
}
