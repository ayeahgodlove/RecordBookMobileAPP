import axios, { AxiosError, AxiosResponse } from "axios";
import {  BASE_URL } from "../constants/constant";
import { tokenConfig } from "../models/config.model";

const apiHeaders = {
  baseURL: `${BASE_URL}/api`,
  headers: {
    Accept: "application/json",
    Authorization: "",
  },
};

const authHeaders = {
  baseURL: `${BASE_URL}`,
  headers: {
    Accept: "application/json",
    Authorization: "",
  },
};

const apiConfig = () => {
  apiHeaders.headers["Authorization"] = `Bearer ${tokenConfig.token}`;
  return apiHeaders;
};

const authConfig = () => {
  authHeaders.headers["Authorization"] = `Bearer ${tokenConfig.token}`;
  return apiHeaders;
};

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    const { data, status } = error.response! as any;
    switch (status) {
      case 400:
        if (data.errors) {
          const modelStateErrors: string[] = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modelStateErrors.push(data.errors[key]);
            }
          }
          throw modelStateErrors.flat();
        }
        console.log(data.title);
        break;
      case 401:
        console.log(data.title);
        break;
      case 500:
        console.log(data.title);
        break;
      default:
        break;
    }
    return Promise.reject(error.response);
  },
);

export const apiRequests = {
  get: (url: string) => axios.get(url, apiConfig()).then(responseBody),
  post: (url: string, body: {}) =>
    axios.post(url, body, apiConfig()).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body, apiConfig()).then(responseBody),
  del: (url: string, body: {}) =>
    axios.delete(url, apiConfig()).then(responseBody),
};

export const authRequests = {
  get: (url: string) => {
    return axios.get(url, authConfig()).then(responseBody);
  },
  post: (url: string, body: {}) =>
    axios.post(url, body, authConfig()).then(responseBody),
  put: (url: string, body: {}) =>
    axios.put(url, body, authConfig()).then(responseBody),
  del: (url: string, body: {}) =>
    axios.delete(url, authConfig()).then(responseBody),
};

