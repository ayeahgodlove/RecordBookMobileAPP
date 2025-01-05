import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {IAsset} from '../models/asset';
import {RootState} from '../redux/store';
import {
  addAssetSuccess,
  editAssetSuccess,
  fetchAssetsAsync,
  setActiveAsset,
} from '../redux/slices/asset.slice';
import {assetService} from '../services/asset.service';

const useAsset = () => {
  const assets = useSelector<RootState, IAsset[]>(state => state.asset.assets);
  const isLoading = useSelector<RootState, boolean>(
    state => state.asset.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.asset.initialFetch,
  );
  const asset = useSelector<RootState, IAsset>(state => state.asset.asset);
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadAssets = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchAssetsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addAsset = async (asset: IAsset) => {
    return await assetService
      .create(asset)
      .then(assetResponse => {
        if (assetResponse.success) {
          dispatch(addAssetSuccess(assetResponse.data));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;

        return false;
      });
  };

  const setAsset = (asset: IAsset) => {
    dispatch(setActiveAsset(asset));
  };

  const editAsset = async (asset: IAsset) => {
    return await assetService
      .update(asset)
      .then(assetResponse => {
        if (assetResponse.success) {
          dispatch(editAssetSuccess(assetResponse.data));
          setAsset(assetResponse.data);
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;
        return false;
      });
  };

  useEffect(() => {
  }, [asset, assets, isLoading, initialFetch]);

  return {
    asset,
    assets,
    isLoading,
    initialFetch,
    addAsset,
    editAsset,
    setAsset,
    loading,
  };
};

export {useAsset};
