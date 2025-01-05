import {apiRequests} from '.';
import {IMeetingMinute, IMeetingMinuteResponse} from '../models/meeting-minute';

export const meetingMinuteService = {
  list: async (): Promise<IMeetingMinute[]> => {
    return apiRequests.get('/meetingMinutes');
  },
  details: (code: string): Promise<IMeetingMinute> =>
    apiRequests.get(`/meetingMinutes/${code}`),
  create: (container: IMeetingMinute): Promise<IMeetingMinuteResponse> =>
    apiRequests.post('/meetingMinutes', container),
  update: (container: IMeetingMinute): Promise<IMeetingMinuteResponse> =>
    apiRequests.put('/meetingMinutes', container),
};
