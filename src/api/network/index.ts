import { NetworkResult } from "@/interface/network";
import ky from "ky";

type request = {
  get: <T>(url: string) => Promise<NetworkResult<T>>;
  post: <T>(url: string, data: any) => Promise<NetworkResult<T>>;
  patch: <T>(url: string, data: any) => Promise<NetworkResult<T>>;
  put: <T>(url: string, data: any) => Promise<NetworkResult<T>>;
  delete: <T>(url: string) => Promise<NetworkResult<T>>;
};

// const axiosRequest: request = {
//   get: <T>(url: string) =>
//     axios.get(url).then<NetworkResult<T>>((res) => ({
//       data: res.data.data,
//       status: res.data.status,
//     })),
//   post: <T>(url: string, data: any) =>
//     axios.post(url, data).then<NetworkResult<T>>((res) => ({
//       data: res.data.data,
//       status: res.data.status,
//     })),
//   patch: <T>(url: string, data: any) =>
//     axios.patch(url, data).then<NetworkResult<T>>((res) => ({
//       data: res.data.data,
//       status: res.data.status,
//     })),
//   put: <T>(url: string, data: any) =>
//     axios.put(url, data).then<NetworkResult<T>>((res) => ({
//       data: res.data.data,
//       status: res.data.status,
//     })),
//   delete: <T>(url: string) =>
//     axios.delete(url).then<NetworkResult<T>>((res) => ({
//       data: res.data.data,
//       status: res.data.status,
//     })),
// };

const kyRequest: request = {
  get: <R = unknown>(url: string) =>
    ky
      .get(url)
      .json<NetworkResult<R>>()
      .then((res) => ({ data: res.data, status: res.status })),
  post: <R = unknown, Q = any>(url: string, data: Q) =>
    ky
      .post(url, { json: data })
      .json<NetworkResult<R>>()
      .then((res) => ({ data: res.data, status: res.status })),
  patch: <R = unknown, Q = any>(url: string, data: Q) =>
    ky
      .patch(url, { json: data })
      .json<NetworkResult<R>>()
      .then((res) => ({ data: res.data, status: res.status })),
  put: <R = unknown, Q = any>(url: string, data: Q) =>
    ky
      .put(url, { json: data })
      .json<NetworkResult<R>>()
      .then((res) => ({ data: res.data, status: res.status })),
  delete: <R = unknown>(url: string) =>
    ky
      .delete(url)
      .json<NetworkResult<R>>()
      .then((res) => ({ data: res.data, status: res.status })),
};

class HttpRequestInstance {
  private request: request;
  constructor(request: request) {
    this.request = request;
  }
  get<R = unknown>(url: string): Promise<NetworkResult<R>> {
    return this.request.get<R>(url);
  }
  post<R = unknown, Q = any>(url: string, data?: Q): Promise<NetworkResult<R>> {
    return this.request.post(url, data);
  }
  delete<R = unknown>(url: string): Promise<NetworkResult<R>> {
    return this.request.delete(url);
  }
  put<R = unknown, Q = any>(url: string, data?: Q): Promise<NetworkResult<R>> {
    return this.request.put(url, data);
  }
  patch<R = unknown, Q = any>(
    url: string,
    data?: Q
  ): Promise<NetworkResult<R>> {
    return this.request.patch(url, data);
  }
}

export const requestInstance = new HttpRequestInstance(kyRequest);
