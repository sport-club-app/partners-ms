import { APIError } from "@/app/exceptions/base-error"
import businessError from "@/app/exceptions/business-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import { ContractRepositoryDb, IContractRepositoryDbMethods } from "@/app/repository/ContractRepositoryDb"

export class GetContract {
    private contractRepository: IContractRepositoryDbMethods
    constructor (contractRepository: ContractRepositoryDb) {
      this.contractRepository = contractRepository
    }

    async execute (id: number) {
      if (!id) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.GENERIC,
          undefined
        )
      }
      const result = await this.contractRepository.findOne(id)
      if (!result) {
        throw new APIError("NOT_FOUND",
          HttpStatusCode.NOT_FOUND,
          true,
          businessError.CONTRACT_NOT_FOUND,
          undefined
        )
      }
      return result
    }
}
