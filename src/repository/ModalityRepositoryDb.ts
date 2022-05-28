import { Modality } from "@Core/entity"
import { entityManager } from "@Infra/db/config"
import { ModalityModel } from "@Infra/models/ModalityModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IModalityRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Modality>> {
  createMany(modality: Modality[]): Promise<Modality[]>
}

export class ModalityRepositoryDb implements IModalityRepositoryDbMethods {
  async createMany (modality: Modality[]) {
    return await entityManager.save(ModalityModel, modality)
  }

  async find () {
    return await entityManager.getRepository(ModalityModel)
      .createQueryBuilder("modality")
      .getMany()
  }

  async findOne (id: number) {
    return await entityManager.findOne(ModalityModel, id)
  }

  async delete (id: number) {
    return await entityManager.delete(ModalityModel, id)
  }

  async update (id: number, modality: Modality) {
    return await entityManager.update(ModalityModel, id, modality)
  }
}
