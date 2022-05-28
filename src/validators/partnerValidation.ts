import niv from "node-input-validator"
import { partnerTranslate } from "./partnerTranslate"

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
    name: "required|string",
    surname: "required|string",
    birthDate: "required|date"
  })

  niv.addCustomMessages({
    "name.required": partnerTranslate.required.name,
    "surname.required": partnerTranslate.required.surname,
    "birthDate.required": partnerTranslate.required.birthDate,

    "name.string": partnerTranslate.type.string,
    "surname.string": partnerTranslate.type.string,
    "birthDate.date": partnerTranslate.custom.date

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
