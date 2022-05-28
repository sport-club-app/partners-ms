import { Contact } from "@Core/entity"

const contactInfomrationList: Contact[] = []

export class ContactMemory {
  async save (contactInfomration: Contact) {
    contactInfomration.id = Math.floor(Math.random() * 1000)
    contactInfomrationList.push(contactInfomration)
    return contactInfomration
  }

  async findAll () {
    return contactInfomrationList
  }

  async findOne (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    return contactInfomrationList.find(pi => pi.id === id)
  }

  async saveOneContact (contact: Contact) {
    const thisContact = contactInfomrationList.push(contact)
    return thisContact
  }

  async updateContact (id: number, partnerId: number, contact: Contact) {
    const thisContact = contactInfomrationList.map(e => {
      if (e.id == id && e.partnerId == partnerId) {
        return e == contact
      }
      return e
    })
    return thisContact
  }

  async delete (id: number) {
    if (!id) {
      return {
        status: 400
      }
    }
    const thiscontact = contactInfomrationList.find(pi => pi.id === id)
    const result = contactInfomrationList.splice(thiscontact.id, 1)
    return result
  }
}
