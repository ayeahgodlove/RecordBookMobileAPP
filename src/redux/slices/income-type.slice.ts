import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  emptyIncomeType,
  IIncomeType,
  IIncomeTypeState,
} from '../../models/income-type';
import {incomeTypeService} from '../../services/income-type.service';

export const initialState: IIncomeTypeState = {
  incomeTypes: [],
  errors: '',
  incomeType: emptyIncomeType,
  isLoading: false,
  initialFetch: true,
};

export const fetchIncomeTypesAsync = createAsyncThunk(
  'incomeType/fetchIncomeTypesAsync',
  async () => {
    return await incomeTypeService.list();
  },
);

export const incomeTypeSlice = createSlice({
  name: 'incomeType',
  initialState,
  reducers: {
    fetchIncomeTypesRequest: state => {
      state.isLoading = true;
    },
    fetchIncomeTypesSuccess: (state, action: PayloadAction<IIncomeType[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.incomeTypes = action.payload;
    },
    fetchIncomeTypesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editIncomeTypeSuccess: (state, action: PayloadAction<IIncomeType>) => {
      state.incomeTypes = state.incomeTypes.map(incomeType => {
        return incomeType.id === action.payload.id
          ? action.payload
          : incomeType;
      });
    },
    addIncomeTypeSuccess: (state, action: PayloadAction<IIncomeType>) => {
      state.incomeTypes = [...state.incomeTypes, action.payload];
    },
    setActiveIncomeType: (state, action: PayloadAction<IIncomeType>) => {
      state.incomeType = action.payload;
    },
    deleteIncomeType: (state, action: PayloadAction<string>) => {
      state.incomeTypes = state.incomeTypes.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchIncomeTypesAsync.pending, (_state, _action) => {
      fetchIncomeTypesRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchIncomeTypesAsync.fulfilled, (_state, action) => {
      fetchIncomeTypesSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.incomeTypes = action.payload;
    });
    builder.addCase(fetchIncomeTypesAsync.rejected, (_state, action) => {
      fetchIncomeTypesError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchIncomeTypesRequest,
  fetchIncomeTypesSuccess,
  fetchIncomeTypesError,
  editIncomeTypeSuccess,
  addIncomeTypeSuccess,
  setActiveIncomeType,
  deleteIncomeType,
} = incomeTypeSlice.actions;

const reducer = incomeTypeSlice.reducer;

export {reducer as incomeTypeReducer};
