import niv from "node-input-validator"
import { registerTranslate } from "./registerTranslate"

export type Erros = {
    status: number,
    body: Object
}

export async function fieldValidated (data: any) {
  if (!data) {
    const error = {
      status: 400,
      body: "Erro ao executar operação"
    }
    return error
  }

  const v = new niv.Validator(data,
    {
      partner: "required|object",
      contacts: "required|array",
      modalities: "required|array",
      "partner.name": "required|string",
      "partner.surname": "required|string",
      "partner.birthDate": "required|date",
      "contacts.*.email": "required|email",
      "contacts.*.phone": "required|integer",
      "contacts.*.address": "required|string"
    }
  )

  niv.addCustomMessages({
    "partner.name.required": registerTranslate.required.name,
    "partner.surname.required": registerTranslate.required.surname,
    "partner.birthDate.required": registerTranslate.required.birthDate,
    "partner.surname.string": registerTranslate.type.string,
    "partner.birthDate.date": registerTranslate.custom.date,
    "partner.name.string": registerTranslate.type.string,

    "contacts.*.phone.required": registerTranslate.required.phone,
    "contacts.*.email.email": registerTranslate.custom.email,
    "contacts.*.phone.integer": registerTranslate.type.integer,
    "contacts.*.address.string": registerTranslate.type.string,
    "contacts.*.address.required": registerTranslate.required.address,
    "contacts.*.email.required": registerTranslate.required.email
  })

  const matched = await v.check()

  if (!matched) {
    const error = {
      status: 422,
      body: v.errors
    }
    return error
  }
}
