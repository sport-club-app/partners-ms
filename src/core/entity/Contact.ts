export class Contact {
    id?: number;
    phone: number;
    email: string;
    address: string;
    createdAt?: Date;
    updatedAt?: Date;
    partnerId?: number;

    private constructor ({
      address,
      email,
      phone,
      createdAt,
      id,
      partnerId,
      updatedAt
    }: Contact) {
      return Object.assign(this, {
        address,
        email,
        phone,
        createdAt,
        id,
        partnerId,
        updatedAt
      })
    }

    static create ({ address, email, phone }: Contact) {
      const contract = new Contact({ address, email, phone })
      return contract
    }

    static delete (id: number, partnerId: number) {
      return {
        id,
        partnerId
      }
    }
}
