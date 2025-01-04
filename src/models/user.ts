import {IRole} from './role';

export interface IUser {
  id: string;
  authStrategy: string;
  fullname: string;
  username: string;
  email: string;
  avatar: string;
  phoneNumber: string;
  city: string; //town
  country: string;
  address: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
  roles?: IRole[];
  token?: string;
}

export const emptyUser: IUser = {
  id: '',
  fullname: '',
  username: '',
  email: '',
  phoneNumber: '',
  city: '',
  country: '',
  address: '',
  password: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  avatar: '',
  authStrategy: '',
  verified: false,
};
