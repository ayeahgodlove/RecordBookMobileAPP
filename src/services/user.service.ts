import {apiRequests} from '.';
import {IUser, IUserResponse} from '../models/user';

export const userService = {
  list: async (): Promise<IUser[]> => {
    return apiRequests.get('/users');
  },
  details: (code: string): Promise<IUser> =>
    apiRequests.get(`/users/${code}`),
  create: (container: any): Promise<IUserResponse> =>
    apiRequests.post('/users', container),
  update: (container: IUser): Promise<IUserResponse> =>
    apiRequests.put('/users', container),
};
