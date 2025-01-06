import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {emptyUser, IUser, IUserState} from '../../models/user';
import {userService} from '../../services/user.service';

export const initialState: IUserState = {
  users: [],
  errors: '',
  user: emptyUser,
  isLoading: false,
  initialFetch: true,
};

export const fetchUsersAsync = createAsyncThunk(
  'user/fetchUsersAsync',
  async () => {
    return await userService.list();
  },
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    fetchUsersRequest: state => {
      state.isLoading = true;
    },
    fetchUsersSuccess: (state, action: PayloadAction<IUser[]>) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.users = action.payload;
    },
    fetchUsersError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users = state.users.map(user => {
        return user.id === action.payload.id ? action.payload : user;
      });
    },
    addUserSuccess: (state, action: PayloadAction<IUser>) => {
      state.users = [...state.users, action.payload];
    },
    setActiveUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchUsersAsync.pending, (_state, _action) => {
      fetchUsersRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchUsersAsync.fulfilled, (_state, action) => {
      fetchUsersSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.users = action.payload;
    });
    builder.addCase(fetchUsersAsync.rejected, (_state, action) => {
      fetchUsersError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchUsersRequest,
  fetchUsersSuccess,
  fetchUsersError,
  editUserSuccess,
  addUserSuccess,
  setActiveUser,
  deleteUser,
} = userSlice.actions;

const reducer = userSlice.reducer;

export {reducer as userReducer};
