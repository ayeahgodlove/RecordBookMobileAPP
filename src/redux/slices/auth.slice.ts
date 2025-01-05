import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IUser} from '../../models/user';
import {setAccessToken} from '../../utils/axios-headers';

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = true;
    },
    login: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      setAccessToken(action.payload.token!);
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      setAccessToken('');
    },
  },
});

export const {login, logout, setLoading} = authSlice.actions;

const reducer = authSlice.reducer;
export {reducer as authReducer};
