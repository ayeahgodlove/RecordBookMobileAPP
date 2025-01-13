import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {emptyExpenseType, IExpenseType} from '../models/expense-type';
import {RootState} from '../redux/store';
import {
  addExpenseTypeSuccess,
  editExpenseTypeSuccess,
  fetchExpenseTypesAsync,
  setActiveExpenseType,
} from '../redux/slices/expense-type.slice';
import {expenseTypeService} from '../services/expense-type.service';

const useExpenseType = () => {
  const expenseTypes = useSelector<RootState, IExpenseType[]>(
    state => state.expenseType.expenseTypes,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.expenseType.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.expenseType.initialFetch,
  );
  const expenseType = useSelector<RootState, IExpenseType>(
    state => state.expenseType.expenseType,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadExpenseTypes = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchExpenseTypesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addExpenseType = async (expenseType: IExpenseType) => {
    return await expenseTypeService
      .create(expenseType)
      .then(expenseTypeResponse => {
        if (expenseTypeResponse.success) {
          dispatch(addExpenseTypeSuccess(expenseTypeResponse.data));
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

  const setExpenseType = (expenseType: IExpenseType) => {
    dispatch(setActiveExpenseType(expenseType));
  };

  const getExpenseTypeName = (expenseTypeId: string) => {
    const expenseTypeName = expenseTypes.find(c => c.id === expenseTypeId)?.name;
    if (expenseTypeName) {
      return expenseTypeName;
    } else {
      return emptyExpenseType.name;
    }
  };
  const editExpenseType = async (expenseType: IExpenseType) => {
    return await expenseTypeService
      .update(expenseType)
      .then(expenseTypeResponse => {
        if (expenseTypeResponse.success) {
          dispatch(editExpenseTypeSuccess(expenseTypeResponse.data));
          setExpenseType(expenseTypeResponse.data);
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
  }, [expenseType, expenseTypes, isLoading, initialFetch]);

  return {
    expenseType,
    expenseTypes,
    isLoading,
    initialFetch,
    addExpenseType,
    editExpenseType,
    setExpenseType,
    loading,
    getExpenseTypeName,
  };
};

export {useExpenseType};
