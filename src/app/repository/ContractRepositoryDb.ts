import { Contract } from "@/app/core/entity"
import { ContractModel } from "@/infra/models/ContractModel"
import { Repository } from "typeorm"
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

export class ContractRepositoryDb implements IContractRepositoryDbMethods {
  constructor (private repository: Repository<ContractModel>) {
    this.repository = repository
  }

  async create (contract: Contract) {
    return await this.repository.save(contract)
  }

  async find () {
    return await this.repository.find()
  }

  async findOne (id: number) {
    return await this.repository.findOne({
      where: { id: id }
    })
  }

  async updateWithPartner (id: number, partnerId: number, contract: Contract) {
    return await this.repository.update(id, {
      ...contract,
      partnerId: partnerId
    })
  }

  async update (id: number, contract: Contract) {
    return await this.repository.update(id, contract)
  }

  async deleteWithPartner (id: number, partnerId: number) {
    return await this.repository.delete({
      partnerId: partnerId,
      id: id
    })
  }

  async delete (id: number) {
    return await this.repository.delete(id)
  }
}
