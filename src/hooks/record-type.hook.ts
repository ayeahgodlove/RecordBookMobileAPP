import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {emptyRecordType, IRecordType} from '../models/record-type';
import {RootState} from '../redux/store';
import {
  addRecordTypeSuccess,
  editRecordTypeSuccess,
  fetchRecordTypesAsync,
  setActiveRecordType,
} from '../redux/slices/record-type.slice';
import {recordTypeService} from '../services/record-type.service';

const useRecordType = () => {
  const recordTypes = useSelector<RootState, IRecordType[]>(
    state => state.recordType.recordTypes,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.recordType.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.recordType.initialFetch,
  );
  const recordType = useSelector<RootState, IRecordType>(
    state => state.recordType.recordType,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadRecordTypes = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchRecordTypesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addRecordType = async (recordType: IRecordType) => {
    return await recordTypeService
      .create(recordType)
      .then(recordTypeResponse => {
        if (recordTypeResponse.success) {
          dispatch(addRecordTypeSuccess(recordTypeResponse.data));
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

  const setRecordType = (recordType: IRecordType) => {
    dispatch(setActiveRecordType(recordType));
  };

  const getRecordType = (recordTypeId: string) => {
    const recordType = recordTypes.find(c => c.id === recordTypeId);
    if (recordType) {
      return recordType;
    } else {
      return emptyRecordType;
    }
  };

  const getRecordTypeName = (recordTypeId: string) => {
    const recordTypeName = recordTypes.find(c => c.id === recordTypeId)?.name;
    if (recordTypeName) {
      return recordTypeName;
    } else {
      return emptyRecordType.name;
    }
  };
  const editRecordType = async (recordType: IRecordType) => {
    return await recordTypeService
      .update(recordType)
      .then(recordTypeResponse => {
        if (recordTypeResponse.success) {
          dispatch(editRecordTypeSuccess(recordTypeResponse.data));
          setRecordType(recordTypeResponse.data);
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

  useEffect(() => {}, [recordType, recordTypes, isLoading, initialFetch]);

  return {
    recordType,
    recordTypes,
    isLoading,
    initialFetch,
    addRecordType,
    editRecordType,
    setRecordType,
    loading,
    getRecordTypeName,
    getRecordType,
  };
};

export {useRecordType};
