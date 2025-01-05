import {apiRequests} from '.';
import {IAsset, IAssetResponse} from '../models/asset';

export const assetService = {
  list: async (): Promise<IAsset[]> => {
    return apiRequests.get('/assets');
  },
  details: (code: string): Promise<IAsset> =>
    apiRequests.get(`/assets/${code}`),
  create: (container: IAsset): Promise<IAssetResponse> =>
    apiRequests.post('/assets', container),
  update: (container: IAsset): Promise<IAssetResponse> =>
    apiRequests.put('/assets', container),
};
