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

export class PartnerRepositoryDb implements IPartnerRepositoryDbMethods {
  async create (partner: Partner) {
    return await entityManager.save(PartnerModel, partner)
  }

  async findAll () {
    return await entityManager
      .getRepository(PartnerModel)
      .createQueryBuilder("partner")
      .getMany()
  }

  async findOne (id: number) {
    return await entityManager.findOne(PartnerModel, { where: { id: id } })
  }

  async update (id: number, partner: Partner) {
    return await entityManager.update(PartnerModel, id, partner)
  }

  async findEmail (partner: Partner) {
    return await entityManager.findOne(PartnerModel, {
      where: { id: partner.id },
      relations: ["contacts"]
    })
  }

  async delete (id: number) {
    return await entityManager.delete(PartnerModel, id)
  }

  async findRelationsOne (
    id: number,
    relations: Array<"contacts" | "modalities" | "contracts">
  ) {
    return await entityManager.findOne(PartnerModel, {
      where: { id: id },
      relations: relations
    })
  }
}
