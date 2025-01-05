import {Action, applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {authReducer} from './slices/auth.slice';
import {financialRecordReducer} from './slices/financial-record.slice';
import {assetReducer} from './slices/asset.slice';
import {meetingMinuteReducer} from './slices/minute.slice';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import { categoryReducer } from './slices/category.slice';

const middlewares: [any] = [thunkMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];
// const composedEnhancers = composeWithDevTools(...enhancers);

const store = configureStore({
  reducer: {
    auth: authReducer,
    financial: financialRecordReducer,
    asset: assetReducer,
    minute: meetingMinuteReducer,
    category: categoryReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serialization checks
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type appThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
