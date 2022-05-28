import "reflect-metadata"
import { createConnection, getManager } from "typeorm"
import { ModalityModel } from "../models/ModalityModel"
import { PartnerModel } from "../models/PartnerModel"
import { ContractModel } from "../models/ContractModel"
import { ContactModel } from "../models/ContactModel"
import { runFactory } from "./factorys"
import "dotenv/config"
import { BgRed, FgGreen } from "../../../console.color"

createConnection({
  type: process.env.DB_ENGINE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [
    ModalityModel,
    PartnerModel,
    ContactModel,
    ContractModel
  ],
  synchronize: true,
  logging: process.env.NODE_ENV === "development",
  timezone: process.env.TIMEZONE
}).then(connection => {
  runFactory(connection)
  console.log(FgGreen, "BANCO DE TESTE CRIADO COM SUCESSO!")
}).catch((error) => {
  if (process.env.NODE_ENV === "development") {
    console.log(BgRed, error)
  }
})

export const entityManager = getManager()
