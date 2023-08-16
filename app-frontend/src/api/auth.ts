import { poster } from '../apiCaller'

// const baseUrl = 'http://localhost:3001';

export const signIn = async (userData: {
  userName: string
  password: string
}) => {
  const url = '/api/auth/login'
  const res = await poster(url, userData)

  if (res.statusCode !== 200) {
    throw new Error(res.message)
  }

  return res
}


// export const signOut = async () => {
//   const url = '/api/auth/logout';
//   const res = await poster(url, {});

//   if (res.statusCode !== 200) {
//     throw new Error(res.message);
//   }

//   return res;
// };
