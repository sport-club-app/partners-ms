import { Contract } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { ContractModel } from "@/infra/models/ContractModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IContractRepositoryDbMethods
    extends IRepositoryDbMethodsBase<Contract> {
    deleteWithPartner(id: number, partnerId: number): Promise<any>;
    updateWithPartner(
        id: number,
        partnerId: number,
        contract: Contract
    ): Promise<any>;
}
const repository = entityManager.getRepository(ContractModel)
export class ContractRepositoryDb implements IContractRepositoryDbMethods {
  async create (contract: Contract) {
    return await repository.save(contract)
  }

  async find () {
    return await repository.find()
  }

  async findOne (id: number) {
    return await repository.findOne({
      where: { id: id }
    })
  }

  async updateWithPartner (id: number, partnerId: number, contract: Contract) {
    return await repository.update(id, {
      ...contract,
      partnerId: partnerId
    })
  }

  async update (id: number, contract: Contract) {
    return await repository.update(id, contract)
  }

  async deleteWithPartner (id: number, partnerId: number) {
    return await repository.delete({
      partnerId: partnerId,
      id: id
    })
  }

  async delete (id: number) {
    return await repository.delete(id)
  }
}
