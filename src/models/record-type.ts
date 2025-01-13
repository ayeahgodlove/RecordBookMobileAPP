import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response.base";

export interface IRecordType {
  id: string;
  name: string;
  description: string;
}

export const emptyRecordType: IRecordType = {
  id: "",
  name: "",
  description: "",
};

export interface IRecordTypeResponse extends IResponseBase {
  data: IRecordType;
}

export interface IRecordTypeState extends IBaseState {
  readonly recordTypes: IRecordType[];
  readonly recordType: IRecordType;
}
