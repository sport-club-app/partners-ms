import { clientRedis } from "@Infra/services/redis/config"

export interface IUserAccountRepositoryDbMethods {
    saveUser: (userId: string, refresh_token: string) => Promise<number>
}

export class UserAccountRepositoryDb implements IUserAccountRepositoryDbMethods {
  async saveUser (userId: any, refresh_token: any) {
    clientRedis.set(userId, refresh_token, (err, reply) => {
      if (err) return 500
      return 201
    })
    return 201
  }
}
