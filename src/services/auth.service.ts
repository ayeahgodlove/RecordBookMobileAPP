import axios from 'axios';
import {BASE_URL} from '../constants/constant';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

type userData = {email: string; password: string};
export const authService = {
  login: async (userData: userData): Promise<any> => {
    console.log('hello...', BASE_URL + '/auth/login', userData);
    return axiosInstance.post('/auth/login', userData);
  },
};
