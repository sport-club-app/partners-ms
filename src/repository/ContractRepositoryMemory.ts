import { IContract } from "@Core/entity"
import { IContractRepositoryDbMethods } from "./ContractRepositoryDb"

const contractList: IContract[] = []

export class ContractRepositoryMemory {
  async save (contract: IContract) {
    contract.id = Math.floor(Math.random() * 1000)
    contractList.push(contract)
    return contract
  }

  async findAll () {
    return contractList
  }

  async findOne (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    return contractList.find(pi => pi.id === id)
  }

  async delete (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    const thisContract = contractList.find(pi => pi.id === id)
    const result = contractList.splice(thisContract.id, 1)
    return result
  }
}
