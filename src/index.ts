import { FgGreen } from "../console.color"
import { server } from "./server"
import { getVersionApi } from "@/app/utils/getVersion"

const version = getVersionApi()

const { APP_HOST, APP_PORT } = process.env
server.listen(APP_PORT, () => {
  console.log(
    FgGreen,
        `Server start in ${APP_HOST}:${APP_PORT}/${version}`
  )
})
