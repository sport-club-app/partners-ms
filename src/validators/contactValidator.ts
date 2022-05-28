import niv from "node-input-validator"
import { contactTranslate } from "./contactTranslate"

export type Erros = {
    status: number,
    body: Object
}

export async function fieldValidated (data: any) {
  if (!data) {
    const error = {
      status: 400,
      body: "Erro ao processar requisição"
    }
    return error
  }

  const v = new niv.Validator(data, {
    email: "required|email",
    phone: "required|integer",
    address: "required|string",
    partnerId: "required|integer"
  })

  niv.addCustomMessages({
    "email.required": contactTranslate.required.email,
    "phone.required": contactTranslate.required.phone,
    "address.required": contactTranslate.required.address,
    "partnerId.required": contactTranslate.required.partnerId,

    "phone.integer": contactTranslate.type.integer,
    "email.email": contactTranslate.custom.email,
    "partnerId.integer": contactTranslate.type.integer,

    "address.string": contactTranslate.type.string
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
