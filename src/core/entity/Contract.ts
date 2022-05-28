
export class Contract {
    id?: number
    start: Date
    dueDate: Date
    isActive: boolean
    status: string
    createdAt?: Date
    updatedAt?: Date
    modalityId?: number
    partnerId: number

    private constructor ({ ...data }: Contract) {
      return Object.assign(this, data)
    }

    static create ({ ...data }: Contract) {
      const contract = new Contract(data)
      return contract
    }
}
