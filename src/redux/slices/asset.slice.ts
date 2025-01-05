import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {emptyAsset, IAsset, IAssetState} from '../../models/asset';
import {assetService} from '../../services/asset.service';

export const initialState: IAssetState = {
  assets: [],
  errors: '',
  asset: emptyAsset,
  isLoading: false,
  initialFetch: true,
};

export const fetchAssetsAsync = createAsyncThunk(
  'asset/fetchAssetsAsync',
  async () => {
    return await assetService.list();
  },
);

export const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    fetchAssetsRequest: state => {
      state.isLoading = true;
    },
    fetchAssetsSuccess: (state, action: PayloadAction<IAsset[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.assets = action.payload;
    },
    fetchAssetsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editAssetSuccess: (state, action: PayloadAction<IAsset>) => {
      state.assets = state.assets.map(asset => {
        return asset.id === action.payload.id ? action.payload : asset;
      });
    },
    addAssetSuccess: (state, action: PayloadAction<IAsset>) => {
      state.assets = [...state.assets, action.payload];
    },
    setActiveAsset: (state, action: PayloadAction<IAsset>) => {
      state.asset = action.payload;
    },
    deleteAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchAssetsAsync.pending, (_state, _action) => {
      fetchAssetsRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchAssetsAsync.fulfilled, (_state, action) => {
      fetchAssetsSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.assets = action.payload;
    });
    builder.addCase(fetchAssetsAsync.rejected, (_state, action) => {
      fetchAssetsError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchAssetsRequest,
  fetchAssetsSuccess,
  fetchAssetsError,
  editAssetSuccess,
  addAssetSuccess,
  setActiveAsset,
  deleteAsset,
} = assetSlice.actions;

const reducer = assetSlice.reducer;

export {reducer as assetReducer};
