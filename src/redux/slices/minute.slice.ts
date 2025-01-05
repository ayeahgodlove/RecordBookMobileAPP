import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {
  emptyMeetingMinute,
  IMeetingMinute,
  IMeetingMinuteState,
} from '../../models/meeting-minute';
import {meetingMinuteService} from '../../services/minute.service';

export const initialState: IMeetingMinuteState = {
  meetingMinutes: [],
  errors: '',
  meetingMinute: emptyMeetingMinute,
  isLoading: false,
  initialFetch: true,
};

export const fetchMeetingMinutesAsync = createAsyncThunk(
  'meetingMinute/fetchMeetingMinutesAsync',
  async () => {
    return await meetingMinuteService.list();
  },
);

export const meetingMinuteSlice = createSlice({
  name: 'meetingMinute',
  initialState,
  reducers: {
    fetchMeetingMinutesRequest: state => {
      state.isLoading = true;
    },
    fetchMeetingMinutesSuccess: (
      state,
      action: PayloadAction<IMeetingMinute[]>,
    ) => {
      state.isLoading = false;
      state.initialFetch = false;
      state.meetingMinutes = action.payload;
    },
    fetchMeetingMinutesError: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.errors = action.payload;
    },
    editMeetingMinuteSuccess: (
      state,
      action: PayloadAction<IMeetingMinute>,
    ) => {
      state.meetingMinutes = state.meetingMinutes.map(meetingMinute => {
        return meetingMinute.id === action.payload.id
          ? action.payload
          : meetingMinute;
      });
    },
    addMeetingMinuteSuccess: (
      state,
      action: PayloadAction<IMeetingMinute>,
    ) => {
      state.meetingMinutes = [...state.meetingMinutes, action.payload];
    },
    setActiveMeetingMinute: (
      state,
      action: PayloadAction<IMeetingMinute>,
    ) => {
      state.meetingMinute = action.payload;
    },
    deleteMeetingMinute: (state, action: PayloadAction<string>) => {
      state.meetingMinutes = state.meetingMinutes.filter(
        record => record.id !== action.payload,
      );
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchMeetingMinutesAsync.pending, (_state, _action) => {
      fetchMeetingMinutesRequest();
      _state.isLoading = true;
    });
    builder.addCase(fetchMeetingMinutesAsync.fulfilled, (_state, action) => {
      fetchMeetingMinutesSuccess(action.payload);
      _state.isLoading = false;
      _state.initialFetch = false;
      _state.meetingMinutes = action.payload;
    });
    builder.addCase(fetchMeetingMinutesAsync.rejected, (_state, action) => {
      fetchMeetingMinutesError(action.payload as string);
      _state.isLoading = false;
      _state.errors = action.payload;
    });
  },
});

export const {
  fetchMeetingMinutesRequest,
  fetchMeetingMinutesSuccess,
  fetchMeetingMinutesError,
  editMeetingMinuteSuccess,
  addMeetingMinuteSuccess,
  setActiveMeetingMinute,
  deleteMeetingMinute,
} = meetingMinuteSlice.actions;

const reducer = meetingMinuteSlice.reducer;

export {reducer as meetingMinuteReducer};
