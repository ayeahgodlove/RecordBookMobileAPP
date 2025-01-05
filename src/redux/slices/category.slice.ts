import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {emptyCategory, ICategory, ICategoryState} from '../../models/category';
import {categoryService} from '../../services/category.service';

export const initialState: ICategoryState = {
  categories: [],
  errors: '',
  category: emptyCategory,
  isLoading: false,
  initialFetch: true,
};

export const fetchCategoriesAsync = createAsyncThunk(
  'category/fetchCategoriesAsync',
  async () => {
    return await categoryService.list();
  },
);

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    fetchCategoriesRequest: state => {
      state.isLoading = true;
    },
    fetchCategoriesSuccess: (state, action: PayloadAction<ICategory[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.categories = action.payload;
    },
    fetchCategoriesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editCategorySuccess: (state, action: PayloadAction<ICategory>) => {
      state.categories = state.categories.map(category => {
        return category.id === action.payload.id ? action.payload : category;
      });
    },
    addCategorySuccess: (state, action: PayloadAction<ICategory>) => {
      state.categories = [...state.categories, action.payload];
    },
    setActiveCategory: (state, action: PayloadAction<ICategory>) => {
      state.category = action.payload;
    },
    deleteCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCategoriesAsync.pending, (_state, _action) => {
      fetchCategoriesRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchCategoriesAsync.fulfilled, (_state, action) => {
      fetchCategoriesSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.categories = action.payload;
    });
    builder.addCase(fetchCategoriesAsync.rejected, (_state, action) => {
      fetchCategoriesError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchCategoriesRequest,
  fetchCategoriesSuccess,
  fetchCategoriesError,
  editCategorySuccess,
  addCategorySuccess,
  setActiveCategory,
  deleteCategory,
} = categorySlice.actions;

const reducer = categorySlice.reducer;

export {reducer as categoryReducer};
