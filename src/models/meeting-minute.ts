
export interface IMeetingMinute {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  meetingDate: Date;
}

export const emptyMeetingMinute: IMeetingMinute = {
  id: "",
  createdBy: "",
  title: "",
  content: "",
  meetingDate: new Date(),
};
