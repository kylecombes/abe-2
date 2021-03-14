import axios, { AxiosRequestConfig } from 'axios';

export async function makeApiRequest(url: string, method: AxiosRequestConfig['method']='get', data: unknown=undefined) {
  try {
    const response = await axios({
      baseURL: `/api`,
      data,
      method,
      url,
    });
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
