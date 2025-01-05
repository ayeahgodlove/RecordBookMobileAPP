import {useDispatch} from 'react-redux';
import {fetchAssetsAsync} from '../../redux/slices/asset.slice';
import {ThunkDispatch} from 'redux-thunk';
import {CombinedState} from '@reduxjs/toolkit/query';
import {Action} from '@reduxjs/toolkit';
import {fetchFinancialRecordsAsync} from '../../redux/slices/financial-record.slice';
import {fetchMeetingMinutesAsync} from '../../redux/slices/minute.slice';
import {useEffect, useMemo, useState} from 'react';
import {useAsset} from '../asset.hook';
import {useFinancialRecord} from '../financial-record.hook';
import {useMeetingMinute} from '../meeting-minute.hook';
import {fetchInitialDataAsync} from './initial-batch';
import {fetchCategoriesAsync} from '../../redux/slices/category.slice';

const useDashboard = () => {
  const {assets} = useAsset();
  const {financialRecords} = useFinancialRecord();
  const {meetingMinutes} = useMeetingMinute();
  const [isGlobalLoading, setGlobalLoading] = useState(true);

  const dispatch: any = useDispatch();

  const financialStats = useMemo(
    () => ({
      totalExpense: financialRecords
        .filter(record => record.type === 'expense')
        .reduce((a, b) => a + b.amount, 0),
      totalIncome: financialRecords
        .filter(record => record.type === 'income')
        .reduce((a, b) => a + b.amount, 0),
      totalAmount: financialRecords.reduce((a, b) => a + b.amount, 0),
    }),
    [financialRecords],
  );

  const assetStats = useMemo(
    () => ({
      count: assets.length,
      estimatedValue: assets.reduce((a, b) => a + b.value, 0),
    }),
    [assets],
  );

  const meetingStats = useMemo(
    () => ({
      totalMeetings: meetingMinutes.length,
      lastMeetingDate:
        meetingMinutes.length > 0
          ? new Date(
              meetingMinutes[meetingMinutes.length - 1].meetingDate,
            ).toDateString()
          : new Date().toDateString(),
    }),
    [meetingMinutes],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(fetchInitialDataAsync());
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setGlobalLoading(false);
      }
    };
    fetchData();
  }, [dispatch]);

  return {
    financialStats,
    assetStats,
    meetingStats,
    isGlobalLoading,
  };
};

export {useDashboard};
