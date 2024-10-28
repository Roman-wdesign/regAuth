import axios from 'axios'

const API_URL = 'https://dist.nd.ru/api'

export const getNotes = async () => {
  const token = localStorage.getItem('accessToken')
  const response = await axios.get(`${API_URL}/notes`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}

export const createNote = async (title: string, content: string) => {
  const token = localStorage.getItem('accessToken')
  const response = await axios.post(
    `${API_URL}/notes`,
    { title, content },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
  return response.data
}

export const deleteNote = async (id: number) => {
  const token = localStorage.getItem('accessToken')
  const response = await axios.delete(`${API_URL}/notes/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.data
}
