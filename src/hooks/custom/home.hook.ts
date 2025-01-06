import {useDispatch} from 'react-redux';
import {useEffect, useMemo, useState} from 'react';
import {useAsset} from '../asset.hook';
import {useFinancialRecord} from '../financial-record.hook';
import {useMeetingMinute} from '../meeting-minute.hook';
import {fetchInitialDataAsync} from './initial-batch';

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
        .reduce((a, b) => a + Number(b.amount), 0),
      totalIncome: financialRecords
        .filter(record => record.type === 'income')
        .reduce((a, b) => a + Number(b.amount), 0),
      totalAmount: financialRecords.reduce((a, b) => a + Number(b.amount), 0),
    }),
    [financialRecords],
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
