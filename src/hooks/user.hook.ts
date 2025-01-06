import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {IUser} from '../models/user';
import {RootState} from '../redux/store';
import {
  addUserSuccess,
  editUserSuccess,
  fetchUsersAsync,
  setActiveUser,
} from '../redux/slices/user.slice';
import {userService} from '../services/user.service';

const useUser = () => {
  const users = useSelector<RootState, IUser[]>(state => state.user.users);
  const isLoading = useSelector<RootState, boolean>(
    state => state.user.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.user.initialFetch,
  );
  const user = useSelector<RootState, IUser>(state => state.user.user);
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadUsers = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchUsersAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addUser = async (user: any) => {
    return await userService
      .create(user)
      .then(userResponse => {
        if (userResponse.success) {
          dispatch(addUserSuccess(userResponse.data));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;
        console.log("error: ", error)
        return false;
      });
  };

  const setUser = (user: IUser) => {
    dispatch(setActiveUser(user));
  };

  const editUser = async (user: IUser) => {
    return await userService
      .update(user)
      .then(userResponse => {
        if (userResponse.success) {
          dispatch(editUserSuccess(userResponse.data));
          setUser(userResponse.data);
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data} = error;
        return false;
      });
  };

  useEffect(() => {
  }, [user, users, isLoading, initialFetch]);

  return {
    user,
    users,
    isLoading,
    initialFetch,
    addUser,
    editUser,
    setUser,
    loading,
  };
};

export {useUser};
