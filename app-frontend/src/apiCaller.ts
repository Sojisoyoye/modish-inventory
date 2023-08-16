import Cookie from 'universal-cookie'

const cookies = new Cookie()
const token = cookies.get('TOKEN')

console.log('api token....', token)

const getter = async (url: string, options?: any): Promise<any> => {
  if (!options) {
    options = createHeaders('GET')
  }
// TODO: better response handling
  const res = await fetch(url, options)
  const res_1 = await res.text()
  const res_2 = (res_1 ? JSON.parse(res_1) : {})
  return res_2
}

const poster = (url: string, dto: any) => {
  return getter(url, createHeaders('POST', dto))
}

const puter = (url: string, dto: any) => {
  return getter(url, createHeaders('PUT', dto))
}

const patcher = (url: string, dto: any) => {
  return getter(url, createHeaders('PATCH', dto))
}

const deleter = (url: string, dto: any) => {
  return getter(url, createHeaders('DELETE', dto))
}

const createHeaders = (method: string, dto?: any) => ({
  method,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `bearer ${token}`,
  },
  body: JSON.stringify(dto),
})

export { getter, poster, puter, patcher, deleter }
