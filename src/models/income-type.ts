import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response.base";


export interface IIncomeType {
  id: string;
  name: string;
  description: string;
}

export const emptyIncomeType: IIncomeType = {
  id: "",
  name: "",
  description: "",
};

export interface IIncomeTypeResponse extends IResponseBase {
  data: IIncomeType;
}

export interface IIncomeTypeState extends IBaseState {
  readonly incomeTypes: IIncomeType[];
  readonly incomeType: IIncomeType;
}
