import axios from 'axios'

const API_URL = 'https://dist.nd.ru/api'

export const register = async (
  email: string,
  password: string,
  confirmPassword: string,
) => {
  const response = await axios.post(`${API_URL}/reg`, {
    email,
    password,
    confirm_password: confirmPassword,
  })
  return response.data
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/auth`, {
    email,
    password,
  })

  const token = response.data.token
  localStorage.setItem('accessToken', token)
  return response.data
}
// Получение токена
export const getAuthToken = () => localStorage.getItem('accessToken')

// Проверка авторизации
export const isAuthenticated = () => !!getAuthToken()

// Выход из системы
export const logout = () => {
  localStorage.removeItem('accessToken')
}
