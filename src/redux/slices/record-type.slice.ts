import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  emptyRecordType,
  IRecordType,
  IRecordTypeState,
} from '../../models/record-type';
import {recordTypeService} from '../../services/record-type.service';

export const initialState: IRecordTypeState = {
  recordTypes: [],
  errors: '',
  recordType: emptyRecordType,
  isLoading: false,
  initialFetch: true,
};

export const fetchRecordTypesAsync = createAsyncThunk(
  'recordType/fetchRecordTypesAsync',
  async () => {
    return await recordTypeService.list();
  },
);

export const recordTypeSlice = createSlice({
  name: 'recordType',
  initialState,
  reducers: {
    fetchRecordTypesRequest: state => {
      state.isLoading = true;
    },
    fetchRecordTypesSuccess: (state, action: PayloadAction<IRecordType[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.recordTypes = action.payload;
    },
    fetchRecordTypesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editRecordTypeSuccess: (state, action: PayloadAction<IRecordType>) => {
      state.recordTypes = state.recordTypes.map(recordType => {
        return recordType.id === action.payload.id
          ? action.payload
          : recordType;
      });
    },
    addRecordTypeSuccess: (state, action: PayloadAction<IRecordType>) => {
      state.recordTypes = [...state.recordTypes, action.payload];
    },
    setActiveRecordType: (state, action: PayloadAction<IRecordType>) => {
      state.recordType = action.payload;
    },
    deleteRecordType: (state, action: PayloadAction<string>) => {
      state.recordTypes = state.recordTypes.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchRecordTypesAsync.pending, (_state, _action) => {
      fetchRecordTypesRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchRecordTypesAsync.fulfilled, (_state, action) => {
      fetchRecordTypesSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.recordTypes = action.payload;
    });
    builder.addCase(fetchRecordTypesAsync.rejected, (_state, action) => {
      fetchRecordTypesError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchRecordTypesRequest,
  fetchRecordTypesSuccess,
  fetchRecordTypesError,
  editRecordTypeSuccess,
  addRecordTypeSuccess,
  setActiveRecordType,
  deleteRecordType,
} = recordTypeSlice.actions;

const reducer = recordTypeSlice.reducer;

export {reducer as recordTypeReducer};
