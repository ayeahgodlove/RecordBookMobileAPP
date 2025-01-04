import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IFinancialRecord } from '../../models/financial-record';


interface FinancialState {
  records: IFinancialRecord[];
}

const initialState: FinancialState = {
  records: [],
};

const financialSlice = createSlice({
  name: 'financial',
  initialState,
  reducers: {
    addRecord: (state, action: PayloadAction<IFinancialRecord>) => {
      state.records.push(action.payload);
    },
    deleteRecord: (state, action: PayloadAction<string>) => {
      state.records = state.records.filter(
        record => record.id !== action.payload,
      );
    },
  },
});

export const {addRecord, deleteRecord} = financialSlice.actions;
export default financialSlice.reducer;
