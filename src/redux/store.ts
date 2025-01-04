import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import financialReducer from './slices/financial-record.slice';
import assetReducer from './slices/asset.slice';
import minuteReducer from './slices/minute.slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    financial: financialReducer,
    asset: assetReducer,
    minute: minuteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
