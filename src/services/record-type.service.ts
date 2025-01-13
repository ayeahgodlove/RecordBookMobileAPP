import {apiRequests} from '.';
import {IRecordType, IRecordTypeResponse} from '../models/record-type';

export const recordTypeService = {
  list: async (): Promise<IRecordType[]> => {
    return apiRequests.get('/recordTypes');
  },
  details: (code: string): Promise<IRecordType> =>
    apiRequests.get(`/recordTypes/${code}`),
  create: (recordType: IRecordType): Promise<IRecordTypeResponse> =>
    apiRequests.post('/recordTypes', recordType),
  update: (recordType: IRecordType): Promise<IRecordTypeResponse> =>
    apiRequests.put('/recordTypes', recordType),
};
