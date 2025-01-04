import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IAsset } from '../../models/asset';


interface AssetState {
  assets: IAsset[];
}

const initialState: AssetState = {
  assets: [],
};

const assetSlice = createSlice({
  name: 'asset',
  initialState,
  reducers: {
    addAsset: (state, action: PayloadAction<IAsset>) => {
      state.assets.push(action.payload);
    },
    removeAsset: (state, action: PayloadAction<string>) => {
      state.assets = state.assets.filter(asset => asset.id !== action.payload);
    },
  },
});

export const {addAsset, removeAsset} = assetSlice.actions;
export default assetSlice.reducer;
