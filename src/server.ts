
import "dotenv/config"
import express from "express"
import cors from "cors"
import { router } from "./routes"
import swaggerUi from "swagger-ui-express"
import swaggerDocument from "../src/docs/swagger.json"
import { getVersionApi } from "@Utils/getVersion"
import { keycloak } from "@Infra/services/keycloak/config"
import { errorHandlerMiddleware } from "@Middleware/error-handler"
import { authMiddleware } from "src/middleware/auth-middleware"

const version = getVersionApi()

export const server = express()
server.use(cors())
server.use(express.json())

server.get(`/${version}/health`, (_, res) => res.send({ message: "partners-ms is running", date: new Date() }))
server.use(`/${version}/docs`, swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.get("/", (_, res) => {
  res.redirect(`/${version}/health`)
})

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", reason)
  process.exit(1)
})

server.use(errorHandlerMiddleware.logErrorMiddleware)
server.use(errorHandlerMiddleware.returnError)
server.use(authMiddleware.execute)

server.use(keycloak.middleware({
  logout: "/logout",
  admin: "/"
}))

server.use(`/${version}`, router)
