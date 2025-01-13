import {apiRequests} from '.';
import {IExpenseType, IExpenseTypeResponse} from '../models/expense-type';

export const expenseTypeService = {
  list: async (): Promise<IExpenseType[]> => {
    return apiRequests.get('/expenseTypes');
  },
  details: (code: string): Promise<IExpenseType> =>
    apiRequests.get(`/expenseTypes/${code}`),
  create: (expenseType: IExpenseType): Promise<IExpenseTypeResponse> =>
    apiRequests.post('/expenseTypes', expenseType),
  update: (expenseType: IExpenseType): Promise<IExpenseTypeResponse> =>
    apiRequests.put('/expenseTypes', expenseType),
};
