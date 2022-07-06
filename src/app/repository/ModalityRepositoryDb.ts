import { Modality } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { ModalityModel } from "@/infra/models/ModalityModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"

export interface IModalityRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Modality>> {
  createMany(modality: Modality[]): Promise<Modality[]>
}

const repository = entityManager.getRepository(ModalityModel)
export class ModalityRepositoryDb implements IModalityRepositoryDbMethods {
  async createMany (modality: Modality[]) {
    return await repository.save(modality)
  }

  async find () {
    return await repository.find()
  }

  async findOne (id: number) {
    return await repository.findOne({ where: { id: id } })
  }

  async delete (id: number) {
    return await repository.delete(id)
  }

  async update (id: number, modality: Modality) {
    return await repository.update(id, modality)
  }
}
