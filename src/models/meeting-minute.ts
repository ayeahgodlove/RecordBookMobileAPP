import {IBaseState} from './base-state.model';
import {IResponseBase} from './response.base';

export interface IMeetingMinute {
  id: string; 
  title: string;
  content: string;
  createdBy: string;
  meetingDate: Date;
}

export const emptyMeetingMinute: IMeetingMinute = {
  id: '',
  createdBy: '',
  title: '',
  content: '',
  meetingDate: new Date(),
};
export interface IMeetingMinuteResponse extends IResponseBase {
  data: IMeetingMinute;
}
export interface IMeetingMinuteState extends IBaseState {
  readonly meetingMinutes: IMeetingMinute[];
  readonly meetingMinute: IMeetingMinute;
}
