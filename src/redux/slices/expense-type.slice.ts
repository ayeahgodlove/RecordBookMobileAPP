import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  emptyExpenseType,
  IExpenseType,
  IExpenseTypeState,
} from '../../models/expense-type';
import {expenseTypeService} from '../../services/expense-type.service';

export const initialState: IExpenseTypeState = {
  expenseTypes: [],
  errors: '',
  expenseType: emptyExpenseType,
  isLoading: false,
  initialFetch: true,
};

export const fetchExpenseTypesAsync = createAsyncThunk(
  'expenseType/fetchExpenseTypesAsync',
  async () => {
    return await expenseTypeService.list();
  },
);

export const expenseTypeSlice = createSlice({
  name: 'expenseType',
  initialState,
  reducers: {
    fetchExpenseTypesRequest: state => {
      state.isLoading = true;
    },
    fetchExpenseTypesSuccess: (state, action: PayloadAction<IExpenseType[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.expenseTypes = action.payload;
    },
    fetchExpenseTypesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editExpenseTypeSuccess: (state, action: PayloadAction<IExpenseType>) => {
      state.expenseTypes = state.expenseTypes.map(expenseType => {
        return expenseType.id === action.payload.id
          ? action.payload
          : expenseType;
      });
    },
    addExpenseTypeSuccess: (state, action: PayloadAction<IExpenseType>) => {
      state.expenseTypes = [...state.expenseTypes, action.payload];
    },
    setActiveExpenseType: (state, action: PayloadAction<IExpenseType>) => {
      state.expenseType = action.payload;
    },
    deleteExpenseType: (state, action: PayloadAction<string>) => {
      state.expenseTypes = state.expenseTypes.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchExpenseTypesAsync.pending, (_state, _action) => {
      fetchExpenseTypesRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchExpenseTypesAsync.fulfilled, (_state, action) => {
      fetchExpenseTypesSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.expenseTypes = action.payload;
    });
    builder.addCase(fetchExpenseTypesAsync.rejected, (_state, action) => {
      fetchExpenseTypesError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchExpenseTypesRequest,
  fetchExpenseTypesSuccess,
  fetchExpenseTypesError,
  editExpenseTypeSuccess,
  addExpenseTypeSuccess,
  setActiveExpenseType,
  deleteExpenseType,
} = expenseTypeSlice.actions;

const reducer = expenseTypeSlice.reducer;

export {reducer as expenseTypeReducer};
