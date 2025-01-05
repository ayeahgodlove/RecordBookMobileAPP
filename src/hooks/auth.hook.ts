import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import {AuthState, login, setLoading} from '../redux/slices/auth.slice';
import {Dispatch, useEffect} from 'react';
import {authService} from '../services/auth.service';
import {IUser} from '../models/user';

export const useAuthentication = () => {
  const auth = useSelector<RootState, AuthState>(state => state.auth);
  const user = useSelector<RootState, IUser | null>(state => state.auth.user);
  const isLoading = useSelector<RootState, boolean>(
    state => state.auth.isLoading,
  );
  const isAuthenticated = useSelector<RootState, boolean>(
    state => state.auth.isAuthenticated,
  );

  const dispatch = useDispatch();

  async function getUserLogins(
    email: string,
    password: string,
    navigation: any,
  ) {
    try {
      dispatch(setLoading(true));
      const response = await authService.login({email, password});
      const {data} = response.data;
      dispatch(login(data));
      dispatch(setLoading(false));
      navigation.navigate('Main', {
        screen: 'Home', // Specify the screen inside MainNavigator
      });
    } catch (error: any) {
      console.error('Login failed:', error.message, error.response?.data);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    // fetch current user from cookies
    // loadUserFromStorage();
  }, [isLoading, isAuthenticated, user, auth]);

  return {
    getUserLogins,
    isAuthenticated,
    isLoading,
    user,
  };
};
