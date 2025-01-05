import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  emptyFinancialRecord,
  IFinancialRecord,
  IFinancialRecordState,
} from '../../models/financial-record';
import {financialRecordService} from '../../services/financial-record.service';

export const initialState: IFinancialRecordState = {
  financialRecords: [],
  errors: '',
  financialRecord: emptyFinancialRecord,
  isLoading: false,
  initialFetch: true,
};

export const fetchFinancialRecordsAsync = createAsyncThunk(
  'financialRecord/fetchFinancialRecordsAsync',
  async () => {
    return await financialRecordService.list();
  },
);

export const financialRecordSlice = createSlice({
  name: 'financialRecord',
  initialState,
  reducers: {
    fetchFinancialRecordsRequest: state => {
      state.isLoading = true;
    },
    fetchFinancialRecordsSuccess: (
      state,
      action: PayloadAction<IFinancialRecord[]>,
    ) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.financialRecords = action.payload;
    },
    fetchFinancialRecordsError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editFinancialRecordSuccess: (
      state,
      action: PayloadAction<IFinancialRecord>,
    ) => {
      state.financialRecords = state.financialRecords.map(financialRecord => {
        return financialRecord.id === action.payload.id
          ? action.payload
          : financialRecord;
      });
    },
    addFinancialRecordSuccess: (
      state,
      action: PayloadAction<IFinancialRecord>,
    ) => {
      state.financialRecords = [...state.financialRecords, action.payload];
    },
    setActiveFinancialRecord: (
      state,
      action: PayloadAction<IFinancialRecord>,
    ) => {
      state.financialRecord = action.payload;
    },
    deleteFinancialRecord: (state, action: PayloadAction<string>) => {
      state.financialRecords = state.financialRecords.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchFinancialRecordsAsync.pending, (_state, _action) => {
      fetchFinancialRecordsRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchFinancialRecordsAsync.fulfilled, (_state, action) => {
      fetchFinancialRecordsSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.financialRecords = action.payload;
    });
    builder.addCase(fetchFinancialRecordsAsync.rejected, (_state, action) => {
      fetchFinancialRecordsError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchFinancialRecordsRequest,
  fetchFinancialRecordsSuccess,
  fetchFinancialRecordsError,
  editFinancialRecordSuccess,
  addFinancialRecordSuccess,
  setActiveFinancialRecord,
  deleteFinancialRecord,
} = financialRecordSlice.actions;

const reducer = financialRecordSlice.reducer;

export {reducer as financialRecordReducer};
