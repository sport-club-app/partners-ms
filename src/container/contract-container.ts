import { UpdateContractStatus, SaveOneContract, GetContract, GetAllContracts, DeleteContract } from "@Core/use-cases/contract"
import { ContractRepositoryDb } from "@Repository/ContractRepositoryDb"

export const contractContainer = () => {
  const contractRepositoryDb = new ContractRepositoryDb()
  const updateContractStatusUseCase = new UpdateContractStatus(contractRepositoryDb)
  const saveOneContractUseCase = new SaveOneContract(contractRepositoryDb)
  const getContractUseCase = new GetContract(contractRepositoryDb)
  const getAllContractUseCase = new GetAllContracts(contractRepositoryDb)
  const deeleteContractUseCase = new DeleteContract(contractRepositoryDb)

  return {
    updateContractStatusUseCase,
    saveOneContractUseCase,
    getContractUseCase,
    getAllContractUseCase,
    deeleteContractUseCase
  }
}
