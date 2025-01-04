import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import { IMeetingMinute } from '../../models/meeting-minute';

interface MinuteState {
  minutes: IMeetingMinute[];
}

const initialState: MinuteState = {
  minutes: [],
};

const minuteSlice = createSlice({
  name: 'minute',
  initialState,
  reducers: {
    addMinute: (state, action: PayloadAction<IMeetingMinute>) => {
      state.minutes.push(action.payload);
    },
    deleteMinute: (state, action: PayloadAction<string>) => {
      state.minutes = state.minutes.filter(
        minute => minute.id !== action.payload,
      );
    },
  },
});

export const {addMinute, deleteMinute} = minuteSlice.actions;
export default minuteSlice.reducer;
