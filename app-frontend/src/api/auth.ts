import { poster } from '../apiCaller'

// const baseUrl = 'http://localhost:3001';

export const signIn = async (userData: {
  userName: string
  password: string
}): Promise<any> => {
  const url = '/api/auth/login'
  const res = await poster(url, userData)

  if (res.statusCode !== 200) {
    throw new Error(res.message)
  }

  return res
}
