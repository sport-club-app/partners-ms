import { IUser } from "@Core/entity"
import qs from "qs"
import { AxiosResponse } from "axios"
import { apiAuth } from "@Infra/services/keycloak/api"

export class HandleCreateUser {
  async execute (user: IUser, serviceAccountToken: string) {
    const { data }: AxiosResponse = await apiAuth.post(`/admin/realms/${process.env.KEYCLOAK_HELM}/users`, user,
      { headers: { Authorization: `${serviceAccountToken}` } }
    )
    return data
  }
}
