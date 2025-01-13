import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {IFinancialRecord} from '../models/financial-record';
import {RootState} from '../redux/store';
import {
  addFinancialRecordSuccess,
  editFinancialRecordSuccess,
  fetchFinancialRecordsAsync,
  setActiveFinancialRecord,
} from '../redux/slices/financial-record.slice';
import {financialRecordService} from '../services/financial-record.service';
import {useExpenseType} from './expense-type.hook';
import {useIncomeType} from './income-type.hook';
import {useRecordType} from './record-type.hook';

const useFinancialRecord = () => {
  const financialRecords = useSelector<RootState, IFinancialRecord[]>(
    state => state.financial.financialRecords,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.financial.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.financial.initialFetch,
  );
  const financialRecord = useSelector<RootState, IFinancialRecord>(
    state => state.financial.financialRecord,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadFinancialRecords = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchFinancialRecordsAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const {expenseTypes} = useExpenseType();
  const {incomeTypes} = useIncomeType();
  const {recordTypes} = useRecordType();

  const financialRecordsWithNames = financialRecords.map(record => {
    const expenseType = expenseTypes.find(
      expenseType => expenseType.id === record.expenseTypeId,
    );
    const incomeType = incomeTypes.find(
      incomeType => incomeType.id === record.incomeTypeId,
    );
    const recordType = recordTypes.find(
      recordType => recordType.id === record.recordTypeId,
    );

    return {
      ...record,
      expenseTypeName: expenseType ? expenseType.name : null,
      incomeTypeName: incomeType ? incomeType.name : null,
      recordTypeName: recordType ? recordType.name : null,
    };
  });

  const addFinancialRecord = async (financialRecord: IFinancialRecord) => {
    return await financialRecordService
      .create(financialRecord)
      .then(financialRecordResponse => {
        if (financialRecordResponse.success) {
          dispatch(addFinancialRecordSuccess(financialRecordResponse.data));
          return true;
        } else {
          return false;
        }
      })
      .catch(error => {
        const {data, message} = error;
        console.log('test: ', error);

        return false;
      });
  };

  const setFinancialRecord = (financialRecord: IFinancialRecord) => {
    dispatch(setActiveFinancialRecord(financialRecord));
  };

  const editFinancialRecord = async (financialRecord: IFinancialRecord) => {
    return await financialRecordService
      .update(financialRecord)
      .then(financialRecordResponse => {
        if (financialRecordResponse.success) {
          dispatch(editFinancialRecordSuccess(financialRecordResponse.data));
          setFinancialRecord(financialRecordResponse.data);
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
    // loadFinancialRecords();
  }, [
    financialRecord,
    financialRecords,
    isLoading,
    initialFetch,
    // loadFinancialRecords,
  ]);

  return {
    financialRecord,
    financialRecords,
    isLoading,
    initialFetch,
    addFinancialRecord,
    editFinancialRecord,
    setFinancialRecord,
    loading,
    financialRecordsWithNames,
  };
};

export {useFinancialRecord};
