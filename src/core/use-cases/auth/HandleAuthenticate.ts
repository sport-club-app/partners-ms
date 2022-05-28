import qs from "qs"
import { keycloak } from "@Infra/services/keycloak/config"
import { AxiosResponse } from "axios"
import { apiAuth } from "@Infra/services/keycloak/api"

const config = keycloak.getConfig()

interface IAuthUser {
    access_token: string
    expires_in: number
    refresh_expires_in: number
    refresh_token: string
    token_type: string
    session_state: string
    scope: string
}

export class HandleAuthenticate {
  async execute (username: string, password: string) {
    const dataFormat = qs.stringify(
      {
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: "password",
        username: username,
        password: password
      }
    )
    const { data }: AxiosResponse<IAuthUser> = await apiAuth.post(`/realms/${process.env.KEYCLOAK_HELM}/protocol/openid-connect/token`, dataFormat, {
      headers: { "content-type": "application/x-www-form-urlencoded" }
    })
    return data
  }
}
