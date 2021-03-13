import axios, { AxiosRequestConfig } from 'axios';

export async function makeBackendRequest(url: string, method: AxiosRequestConfig['method']='get', data:Record<string,unknown>=undefined) {
  try {
    const response = await axios({
      baseURL: process.env.BACKEND_URL,
      data,
      method,
      url,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
