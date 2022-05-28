import axios from "axios"

export const apiAuth = axios.create({
  baseURL: process.env.AUTH_API_URL
})
