import { IUserAccountRepositoryDbMethods, UserAccountRepositoryDb } from "@Repository/UserAccountRepositoryDb"

export class HandleSaveUser {
    private userAccountRepository: IUserAccountRepositoryDbMethods
    constructor (userAccountRepository: UserAccountRepositoryDb) {
      this.userAccountRepository = userAccountRepository
    }

    async execute (userId: string, refresh_token: string) {
      return this.userAccountRepository.saveUser(userId, refresh_token)
    }
}
