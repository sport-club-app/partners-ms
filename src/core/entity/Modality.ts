
export class Modality {
  id?: number
  name: string
  description: string
  createdAt?: Date
  updatedAt?: Date

  private constructor ({ ...data }: Modality) {
    return Object.assign(this, data)
  }

  static create ({ ...data }: Modality) {
    const modality = new Modality(data)
    return modality
  }
}
