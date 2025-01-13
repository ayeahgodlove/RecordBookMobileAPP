import {apiRequests} from '.';
import {IIncomeType, IIncomeTypeResponse} from '../models/income-type';

export const incomeTypeService = {
  list: async (): Promise<IIncomeType[]> => {
    return apiRequests.get('/incomeTypes');
  },
  details: (code: string): Promise<IIncomeType> =>
    apiRequests.get(`/incomeTypes/${code}`),
  create: (incomeType: IIncomeType): Promise<IIncomeTypeResponse> =>
    apiRequests.post('/incomeTypes', incomeType),
  update: (incomeType: IIncomeType): Promise<IIncomeTypeResponse> =>
    apiRequests.put('/incomeTypes', incomeType),
};
