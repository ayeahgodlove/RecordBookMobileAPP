import {fetchAssetsAsync} from '../../redux/slices/asset.slice';
import {fetchCategoriesAsync} from '../../redux/slices/category.slice';
import {fetchExpenseTypesAsync} from '../../redux/slices/expense-type.slice';
import {fetchFinancialRecordsAsync} from '../../redux/slices/financial-record.slice';
import {fetchIncomeTypesAsync} from '../../redux/slices/income-type.slice';
import {fetchMeetingMinutesAsync} from '../../redux/slices/minute.slice';
import {fetchRecordTypesAsync} from '../../redux/slices/record-type.slice';
import {appThunk} from '../../redux/store';

export const fetchInitialDataAsync = (): appThunk => async dispatch => {
  dispatch(fetchCategoriesAsync());
  dispatch(fetchAssetsAsync());
  dispatch(fetchFinancialRecordsAsync());
  dispatch(fetchMeetingMinutesAsync());
  dispatch(fetchIncomeTypesAsync());
  dispatch(fetchExpenseTypesAsync());
  dispatch(fetchRecordTypesAsync());
};
