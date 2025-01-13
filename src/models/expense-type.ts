import {IBaseState} from './base-state.model';
import {IResponseBase} from './response.base';

export interface IExpenseType {
  id: string;
  name: string;
  description: string;
}

export const emptyExpenseType: IExpenseType = {
  id: '',
  name: '',
  description: '',
};

export interface IExpenseTypeResponse extends IResponseBase {
  data: IExpenseType;
}

export interface IExpenseTypeState extends IBaseState {
  readonly expenseTypes: IExpenseType[];
  readonly expenseType: IExpenseType;
}
