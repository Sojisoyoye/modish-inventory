import axios from 'axios'

const baseUrl = 'http://localhost:3001'

export const signIn = async (userData: {
  userName: string
  password: string
}) => {
  const url = `/api/auth/login`
  const { data } = await axios.post(url, userData)

  return data
}
