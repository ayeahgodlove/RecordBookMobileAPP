import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response.base";

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


export interface IAssetResponse extends IResponseBase {
  data: IAsset;
}

export interface IAssetState extends IBaseState {
  readonly assets: IAsset[];
  readonly asset: IAsset;
}
