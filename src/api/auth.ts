// api/auth.ts
import axios from 'axios'

const API_URL = 'https://dist.nd.ru/api'

export const register = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/register`, {
    email,
    password,
  })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth/login`, {
    email,
    password,
  })
  return response.data
}
