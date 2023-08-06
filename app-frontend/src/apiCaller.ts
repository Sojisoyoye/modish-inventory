import Cookie from "universal-cookie";

const cookies = new Cookie();
const token = cookies.get("TOKEN");

const getter = (url: string, options?: any): Promise<any> => {
  if (!options) {
    options = createHeaders('GET');
  }

  return fetch(url, options)
    .then((res) => res.text())
    .then((res) => (res ? JSON.parse(res) : {}))
    .then((res) => res);
};

const poster = (url: string, dto: any) => {
  return getter(url, createHeaders('POST', dto));
};

const puter = (url: string, dto: any) => {
  return getter(url, createHeaders('PUT', dto));
};

const patcher = (url: string, dto: any) => {
  return getter(url, createHeaders('PATCH', dto));
};

const deleter = (url: string, dto: any) => {
  return getter(url, createHeaders('DELETE', dto));
};

const createHeaders = (method: string, dto?: any) => ({
  method,
  headers: { 
    'Content-Type': 'application/json', 
    Authorization: `bearer ${token}`
  },
  body: JSON.stringify(dto),
});

export { getter, poster, puter, patcher, deleter };
