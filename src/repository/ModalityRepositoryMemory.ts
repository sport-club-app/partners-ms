import { Modality } from "@Core/entity"

const modalityList: Modality[] = []

export class ModalityRepositoryMemory {
  async save (modality: Modality) {
    modality.id = Math.floor(Math.random() * 1000)
    modalityList.push(modality)
    return modality
  }

  async findAll () {
    return modalityList
  }

  async findOne (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    return modalityList.find((pi) => pi.id === id)
  }

  async delete (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    const thisModality = modalityList.find((pi) => pi.id === id)
    const result = modalityList.splice(thisModality.id, 1)
    return result
  }
}
