export interface IAsset {
  id: string;
  name: string;
  description: string;
  value: number;
  status: string;
  acquireDate: Date;
  createdBy: string;
}

export const emptyAsset: IAsset = {
  id: '',
  description: '',
  createdBy: '',
  name: '',
  value: 0,
  status: '',
  acquireDate: new Date(),
};
