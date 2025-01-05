import {useDispatch, useSelector} from 'react-redux';
import {useCallback, useEffect} from 'react';
import {IMeetingMinute} from '../models/meeting-minute';
import {RootState} from '../redux/store';
import {
  addMeetingMinuteSuccess,
  editMeetingMinuteSuccess,
  fetchMeetingMinutesAsync,
  setActiveMeetingMinute,
} from '../redux/slices/minute.slice';
import {meetingMinuteService} from '../services/minute.service';

const useMeetingMinute = () => {
  const meetingMinutes = useSelector<RootState, IMeetingMinute[]>(
    state => state.minute.meetingMinutes,
  );
  const isLoading = useSelector<RootState, boolean>(
    state => state.minute.isLoading,
  );
  const initialFetch = useSelector<RootState, boolean>(
    state => state.minute.initialFetch,
  );
  const meetingMinute = useSelector<RootState, IMeetingMinute>(
    state => state.minute.meetingMinute,
  );
  const loading = initialFetch || isLoading;
  const dispatch = useDispatch();

  const loadMeetingMinutes = useCallback(() => {
    if (initialFetch) {
      dispatch(fetchMeetingMinutesAsync() as any);
    }
  }, [dispatch, initialFetch]);

  const addMeetingMinute = async (meetingMinute: IMeetingMinute) => {
    return await meetingMinuteService
      .create(meetingMinute)
      .then(meetingMinuteResponse => {
        if (meetingMinuteResponse.success) {
          dispatch(addMeetingMinuteSuccess(meetingMinuteResponse.data));
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

  const setMeetingMinute = (meetingMinute: IMeetingMinute) => {
    dispatch(setActiveMeetingMinute(meetingMinute));
  };

  const editMeetingMinute = async (meetingMinute: IMeetingMinute) => {
    return await meetingMinuteService
      .update(meetingMinute)
      .then(meetingMinuteResponse => {
        if (meetingMinuteResponse.success) {
          dispatch(editMeetingMinuteSuccess(meetingMinuteResponse.data));
          setMeetingMinute(meetingMinuteResponse.data);
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
  }, [
    meetingMinute,
    meetingMinutes,
    isLoading,
    initialFetch,
  ]);

  return {
    meetingMinute,
    meetingMinutes,
    isLoading,
    initialFetch,
    addMeetingMinute,
    editMeetingMinute,
    setMeetingMinute,
    loading,
  };
};

export {useMeetingMinute};
