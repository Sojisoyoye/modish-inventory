const createHeaders = (method: string, dto?: any) => {
  const token = sessionStorage.getItem('auth_token')

  return {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dto),
  }
}

const getter = (url: string, options?: any): Promise<any> => {
  if (!options) {
    options = createHeaders('GET')
  }

  return fetch(url, options)
    .then((res) => res.text())
    .then((res) => (res ? JSON.parse(res) : {}))
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

export { getter, poster, puter, patcher, deleter }
