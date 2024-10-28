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

  const accessToken = response.data.accessToken
  localStorage.setItem('accessToken', accessToken)
  return response.data
}

// Получение токена
export const getAuthToken = () => localStorage.getItem('accessToken')

// Проверка авторизации
export const isAuthenticated = async () => {
  const token = getAuthToken()
  if (!token) return false

  try {
    const response = await axios.get(`${API_URL}/auth`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.status === 200
  } catch (error) {
    return false
  }
}

// Обновленный метод logout с дополнительными заголовками
export const logout = async () => {
  const token = getAuthToken()
  if (token) {
    try {
      const response = await axios.delete(`${API_URL}/auth`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json', // Принудительно ожидаем JSON
        },
        // Игнорируем обработку тела ответа, чтобы избежать синтаксических ошибок
        transformResponse: () => null,
        validateStatus: function (status) {
          return status >= 200 && status < 300
        },
      })

      localStorage.removeItem('accessToken')

      if (response.status === 204 || response.status === 200) {
        console.log('Выход выполнен успешно')
      } else {
        console.warn(
          'Не удалось выполнить выход. Статус ответа:',
          response.status,
        )
      }
    } catch (error) {
      console.error('Ошибка при выходе из аккаунта:', error)
    }
  }
}
