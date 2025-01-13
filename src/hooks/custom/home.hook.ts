import {useDispatch} from 'react-redux';
import {useEffect, useMemo, useState} from 'react';
import {useAsset} from '../asset.hook';
import {useFinancialRecord} from '../financial-record.hook';
import {useMeetingMinute} from '../meeting-minute.hook';
import {fetchInitialDataAsync} from './initial-batch';
import {RECORD_TYPE} from '../../constants/constant';

const useDashboard = () => {
  const {assets} = useAsset();
  const {financialRecordsWithNames} = useFinancialRecord();
  const {meetingMinutes} = useMeetingMinute();
  const [isGlobalLoading, setGlobalLoading] = useState(true);

  const dispatch: any = useDispatch();

  const financialStats = useMemo(
    () => ({
      totalExpense: financialRecordsWithNames
        .filter(record => record.recordTypeName === RECORD_TYPE.EXPENSE)
        .reduce((a, b) => a + Number(b.amount), 0),
      totalIncome: financialRecordsWithNames
        .filter(record => record.recordTypeName === RECORD_TYPE.INCOME)
        .reduce((a, b) => a + Number(b.amount), 0),
      totalAmount: financialRecordsWithNames.reduce(
        (a, b) => a + Number(b.amount),
        0,
      ),
    }),
    [financialRecordsWithNames],
  );

  const assetStats = useMemo(
    () => ({
      count: assets.length,
      estimatedValue: assets.reduce((a, b) => a + Number(b.value), 0),
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
      lastMeetingTitle:
        meetingMinutes.length > 0
          ? meetingMinutes[meetingMinutes.length - 1].title
          : 'No meetings scheduled',
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
