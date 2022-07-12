import { ContactRepositoryDb, IContactRepositoryDbMethods } from "@/app/repository/ContactRepositoryDb"
import { Contact } from "@/app/core/entity"
import { APIError } from "@/app/exceptions/base-error"
import { HttpStatusCode } from "@/app/exceptions/interfaces"
import businessError from "@/app/exceptions/business-error"
import { SaveContact } from "./SaveContact"

export class SaveOneContact {
    private contactRepository: IContactRepositoryDbMethods
    constructor (contactRepository: ContactRepositoryDb) {
      this.contactRepository = contactRepository
    }

    async execute (contact: Contact) {
      const contactSaved = await this.contactRepository.saveOneContact(contact)
      if (!contactSaved) {
        throw new APIError("BAD_REQUEST",
          HttpStatusCode.BAD_REQUEST,
          true,
          businessError.CONTACT_NOT_CREATED
        )
      }
      return contactSaved
    }
}
