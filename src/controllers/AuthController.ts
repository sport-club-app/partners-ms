import { Request, Response } from "express"
import { HandleAuthenticate } from "@Core/use-cases/auth/HandleAuthenticate"
import { HandleSaveUser } from "@Core/use-cases/user-account/HandleSaveUser"
import { UserAccountRepositoryDb } from "@Repository/UserAccountRepositoryDb"
import { HandleCreateUser } from "@Core/use-cases/user-account/HandleCreateUser"
import jwt_decode from "jwt-decode"
import { User } from "@Core/entity"

const handleAuthenticate = new HandleAuthenticate()
const userAccountRepositoryDb = new UserAccountRepositoryDb()
const handleSaveUser = new HandleSaveUser(userAccountRepositoryDb)
const handleCreateUser = new HandleCreateUser()

class AuthController {
  async login (req: Request, res: Response) {
    const username = req.body.username
    const password = req.body.password
    try {
      const result = await handleAuthenticate.execute(username, password)
      if (result.access_token) {
        const user: any = jwt_decode(result.access_token)
        await handleSaveUser.execute(user.sub, result.refresh_token)
        return res.send(result)
      } else {
        return res.status(403)
      }
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }

  async createUser (req: Request, res: Response) {
    const user: User = req.body
    try {
      await handleCreateUser.execute(user, req.headers.authorization)
      return res.send(201)
    } catch (error) {
      if (process.env.NODE_ENV === "development") return res.status(500).send(error)
      return res.status(500).send({ message: "Erro! contate o administrador do sistema" })
    }
  }
}

export default new AuthController()
