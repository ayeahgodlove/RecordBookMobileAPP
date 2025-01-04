
export interface IFinancialRecord {
  id: string;
  categoryId: string;
  type: string;
  amount: number;
  description: string;
  recordDate: Date;
  createdBy: string;
}

export const emptyFinancialRecord: IFinancialRecord = {
  id: "",
  categoryId: "",
  type: "",
  amount: 0,
  description: "",
  recordDate: new Date(),
  createdBy: "",
};