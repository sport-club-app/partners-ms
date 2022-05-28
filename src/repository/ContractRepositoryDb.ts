import { Contract } from "@Core/entity"
import { entityManager } from "@Infra/db/config"
import { ContractModel } from "@Infra/models/ContractModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IContractRepositoryDbMethods extends IRepositoryDbMethodsBase<Contract> {
    deleteWithPartner(id: number, partnerId: number): Promise<any>
    updateWithPartner(id: number, partnerId: number, contract: Contract): Promise<any>
}

export class ContractRepositoryDb implements IContractRepositoryDbMethods {
  async create (contract: Contract) {
    return await entityManager.save(ContractModel, contract)
  }

  async find () {
    return await entityManager.getRepository(ContractModel)
      .createQueryBuilder("contract")
      .getMany()
  }

  async findOne (id: number) {
    return await entityManager.findOne(ContractModel, id)
  }

  async updateWithPartner (id: number, partnerId: number, contract: Contract) {
    return await entityManager.update(ContractModel, id, { ...contract, partnerId: partnerId })
  }

  async update (id: number, contract: Contract) {
    return await entityManager.update(ContractModel, id, contract)
  }

  async deleteWithPartner (id: number, partnerId: number) {
    return await entityManager.delete(ContractModel, { partnerId: partnerId, id: id })
  }

  async delete (id: number) {
    return await entityManager.delete(ContractModel, id)
  }
}
