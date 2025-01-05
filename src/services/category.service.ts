import {apiRequests} from '.';
import {ICategory, ICategoryResponse} from '../models/category';

export const categoryService = {
  list: async (): Promise<ICategory[]> => {
    return apiRequests.get('/categories');
  },
  details: (code: string): Promise<ICategory> =>
    apiRequests.get(`/categories/${code}`),
  create: (container: ICategory): Promise<ICategoryResponse> =>
    apiRequests.post('/categories', container),
  update: (container: ICategory): Promise<ICategoryResponse> =>
    apiRequests.put('/categories', container),
};
