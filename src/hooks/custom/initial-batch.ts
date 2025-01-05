import {fetchAssetsAsync} from '../../redux/slices/asset.slice';
import {fetchCategoriesAsync} from '../../redux/slices/category.slice';
import {fetchFinancialRecordsAsync} from '../../redux/slices/financial-record.slice';
import {fetchMeetingMinutesAsync} from '../../redux/slices/minute.slice';
import {appThunk} from '../../redux/store';

export const fetchInitialDataAsync = (): appThunk => async dispatch => {
  dispatch(fetchCategoriesAsync());
  dispatch(fetchAssetsAsync());
  dispatch(fetchFinancialRecordsAsync());
  dispatch(fetchMeetingMinutesAsync());
};
