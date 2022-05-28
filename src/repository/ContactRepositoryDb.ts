import { Contact } from "@Core/entity"
import { entityManager } from "@Infra/db/config"
import { ContactModel } from "@Infra/models/ContactModel"
import { IRepositoryDbMethodsBase } from "./RepositoryBase"
export interface IContactRepositoryDbMethods extends Partial<IRepositoryDbMethodsBase<Contact>> {
    findEmail(contacts: Contact[]): Promise<ContactModel[]>
    saveOneContact(contact: Contact): Promise<ContactModel>
    updateContact(id: number, partnerId: number, contact: Contact): Promise<any>
    createMany(contacts: Contact[]): Promise<ContactModel[]>
}

export class ContactRepositoryDb implements IContactRepositoryDbMethods {
  async createMany (contacts: Contact[]) {
    return await entityManager.save(ContactModel, contacts)
  }

  async find () {
    return await entityManager.getRepository(ContactModel)
      .createQueryBuilder("modality")
      .getMany()
  }

  async findOne (id: number) {
    return await entityManager.findOne(ContactModel, id)
  }

  async findEmail (contacts: ContactModel[]) {
    const listEmail = []
    for (const ct of contacts) {
      const emailExists = await entityManager.find(ContactModel, { where: { email: ct.email } })
      listEmail.push(emailExists)
    }
    return listEmail[0]
  }

  async saveOneContact (contact: Contact) {
    return await entityManager.save(ContactModel, contact)
  }

  async updateContact (id: number, partnerId: number, contact: Contact) {
    return await entityManager.update(ContactModel, id, { ...contact, partnerId: partnerId })
  }

  async delete (id: number, partnerId: number) {
    return await entityManager.delete(ContactModel, { partnerId: partnerId, id: id })
  }
}
