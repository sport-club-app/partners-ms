import { Partner } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { PartnerModel } from "@/infra/models/PartnerModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IPartnerRepositoryDbMethods
    extends Partial<IRepositoryDbMethodsBase<Partner>> {
    findEmail(partner: Partner): Promise<Partner>;
    findRelationsOne(
        id: number,
        relations: Array<"contacts" | "modalities" | "contracts">
    ): Promise<Partner>;
}

const repository = entityManager.getRepository(PartnerModel)

export class PartnerRepositoryDb implements IPartnerRepositoryDbMethods {
  async create (partner: Partner) {
    return await repository.save(partner)
  }

  async findAll () {
    return await repository.find()
  }

  async findOne (id: number) {
    return await repository.findOne({ where: { id: id } })
  }

  async update (id: number, partner: Partner) {
    return await repository.update(id, partner)
  }

  async findEmail (partner: Partner) {
    return await repository.findOne({
      where: { id: partner.id },
      relations: ["contacts"]
    })
  }

  async delete (id: number) {
    return await repository.delete(id)
  }

  async findRelationsOne (
    id: number,
    relations: Array<"contacts" | "modalities" | "contracts">
  ) {
    return await repository.findOne({
      where: { id: id },
      relations: relations
    })
  }
}
