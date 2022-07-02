import { ContactRepositoryDb } from "@/app/repository/ContactRepositoryDb"

export class DeleteContact {
  constructor (private contactRepository: ContactRepositoryDb) {
    this.contactRepository = contactRepository
  }

  async execute (id: number) {
    return this.contactRepository.delete(id)
  }
}
