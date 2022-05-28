import { Partner } from "@Core/entity"

const partnerList: Partner[] = []

const dataValidated: Partner = {
  id: 123,
  name: "joao",
  surname: "da silva",
  birthDate: new Date("1990-02-24")
}

export class PartnerRepositoryMemory {
  async save (partner: Partner) {
    partner.id = Math.floor(Math.random() * 1000)
    partnerList.push(partner)
    return partner
  }

  async findAll () {
    return partnerList
  }

  async findOne (id: number) {
    if (!id) {
      return {
        status: 400
      }
    } else if (partnerList.length == 0) {
      partnerList.push(dataValidated)
    }
    return partnerList.find(pi => pi.id === id)
  }

  async delete (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    const thisPartner = partnerList.find(pi => pi.id === id)
    const result = partnerList.splice(thisPartner.id, 1)
    return result
  }
}
