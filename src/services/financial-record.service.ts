import {apiRequests} from '.';
import {IFinancialRecord, IFinancialRecordResponse} from '../models/financial-record';

export const financialRecordService = {
  list: async (): Promise<IFinancialRecord[]> => {
    return apiRequests.get('/financialRecords');
  },
  details: (code: string): Promise<IFinancialRecord> =>
    apiRequests.get(`/financialRecords/${code}`),
  create: (container: IFinancialRecord): Promise<IFinancialRecordResponse> =>
    apiRequests.post('/financialRecords', container),
  update: (container: IFinancialRecord): Promise<IFinancialRecordResponse> =>
    apiRequests.put('/financialRecords', container),
}; 
