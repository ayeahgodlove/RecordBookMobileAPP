import {IBaseState} from './base-state.model';
import {IResponseBase} from './response.base';

export interface IFinancialRecord {
  id: string;
  incomeTypeId: string;
  expenseTypeId: string;
  recordTypeId: string;
  amount: number;
  description: string;
  recordDate: Date;
  createdBy: string;
}

export const emptyFinancialRecord: IFinancialRecord = {
  id: '',
  incomeTypeId: '',
  expenseTypeId: '',
  recordTypeId: '',
  amount: 0,
  description: '',
  recordDate: new Date(),
  createdBy: '',

};

export interface IFinancialRecordResponse extends IResponseBase {
  data: IFinancialRecord;
}

export interface IFinancialRecordState extends IBaseState {
  readonly financialRecords: IFinancialRecord[];
  readonly financialRecord: IFinancialRecord;
}
