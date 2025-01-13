import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {emptyIncomeType, IIncomeType} from '../models/income-type';
import {RootState} from '../redux/store';
import {
  addIncomeTypeSuccess,
  editIncomeTypeSuccess,
  fetchIncomeTypesAsync,
  setActiveIncomeType,
} from '../redux/slices/income-type.slice';
import {incomeTypeService} from '../services/income-type.service';

const useIncomeType = () => {
  const incomeTypes = useSelector<RootState, IIncomeType[]>(
    state => state.incomeType.incomeTypes,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.incomeType.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.incomeType.initialFetch,
  );
  const incomeType = useSelector<RootState, IIncomeType>(
    state => state.incomeType.incomeType,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadIncomeTypes = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchIncomeTypesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addIncomeType = async (incomeType: IIncomeType) => {
    return await incomeTypeService
      .create(incomeType)
      .then(incomeTypeResponse => {
        if (incomeTypeResponse.success) {
          dispatch(addIncomeTypeSuccess(incomeTypeResponse.data));
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

  const setIncomeType = (incomeType: IIncomeType) => {
    dispatch(setActiveIncomeType(incomeType));
  };

  const getIncomeTypeName = (incomeTypeId: string) => {
    const incomeTypeName = incomeTypes.find(c => c.id === incomeTypeId)?.name;
    if (incomeTypeName) {
      return incomeTypeName;
    } else {
      return emptyIncomeType.name;
    }
  };
  const editIncomeType = async (incomeType: IIncomeType) => {
    return await incomeTypeService
      .update(incomeType)
      .then(incomeTypeResponse => {
        if (incomeTypeResponse.success) {
          dispatch(editIncomeTypeSuccess(incomeTypeResponse.data));
          setIncomeType(incomeTypeResponse.data);
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
  }, [incomeType, incomeTypes, isLoading, initialFetch]);

  return {
    incomeType,
    incomeTypes,
    isLoading,
    initialFetch,
    addIncomeType,
    editIncomeType,
    setIncomeType,
    loading,
    getIncomeTypeName,
  };
};

export {useIncomeType};
