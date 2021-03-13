import axios, { AxiosRequestConfig } from 'axios';

export async function makeBackendRequest(url: string, method: AxiosRequestConfig['method']='get', data: unknown=undefined) {
  try {
    const response = await axios({
      baseURL: process.env.BACKEND_URL,
      data,
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_BEARER}`,
      },
      method,
      url,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
