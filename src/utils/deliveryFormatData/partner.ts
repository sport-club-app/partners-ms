
import { Contract, Partner } from "@Core/entity"

export function resultSavePartner (partner: Partner, contract: Contract) {
  return {
    partner: {
      id: partner.id,
      name: partner.name,
      surname: partner.surname,
      birthDate: partner.birthDate,
      createdAt: partner.createdAt,
      updatedAt: partner.updatedAt
    },
    contacts: partner.contacts,
    modalities: partner.modalities,
    contracts: contract
  }
}
