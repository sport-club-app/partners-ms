import { Contact, Modality } from "@Core/entity"

export class Partner {
  id?: number
  name: string
  surname: string
  birthDate: Date
  createdAt?: Date
  updatedAt?: Date
  contacts?: Contact[]
  modalities?: Modality[]

  private constructor ({ ...data }: Partner) {
    return Object.assign(this, data)
  }

  static create ({ ...data }: Partner) {
    const contract = new Partner(data)
    return contract
  }
}
