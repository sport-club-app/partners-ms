import { Contact } from "@/app/core/entity"
import { entityManager } from "@/infra/db/config"
import { ContactModel } from "@/infra/models/ContactModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"
export interface IContactRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Contact>> {
    findEmail(contacts: Contact[]): Promise<String>
    saveOneContact(contact: Contact): Promise<Contact>
    updateContact(id: number, partnerId: number, contact: Contact): Promise<any>
    createMany(contacts: Contact[]): Promise<Contact[]>
}

const repository = entityManager.getRepository(ContactModel)

export class ContactRepositoryDb implements IContactRepositoryDbMethods {
  async createMany (contacts: Contact[]) {
    return await repository.save(contacts)
  }

  async find () {
    return await repository.find()
  }

  async findOne (id: number) {
    return await repository.findOne({ where: { id: id } })
  }

  async findEmail (contacts: Contact[]) {
    const listEmail = []
    for (const ct of contacts) {
      const emailExists = await repository.find({ where: { email: ct.email } })
      listEmail.push(emailExists)
    }
    return listEmail[0]
  }

  async saveOneContact (contact: Contact) {
    return await repository.save(contact)
  }

  async updateContact (id: number, partnerId: number, contact: Contact) {
    return await repository.update(id, { ...contact, partnerId: partnerId })
  }

  async delete (id: number) {
    return await repository.delete(id)
  }
}
