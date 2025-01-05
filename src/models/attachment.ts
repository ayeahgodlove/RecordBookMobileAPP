import {IBaseState} from './base-state.model';
import {IResponseBase} from './response.base';

export interface IAttachment {
  id: string;
  filePath: string;
  fileType: string;
  relatedTo: string; //meeting-minute, financial record, asset
  uploadedBy: string;
}

export const emptyAttachment: IAttachment = {
  id: '',
  filePath: '',
  fileType: '',
  relatedTo: '',
  uploadedBy: '',
};

export interface IAttachmentResponse extends IResponseBase {
  data: IAttachment;
}

export interface IAttachmentState extends IBaseState {
  readonly attachments: IAttachment[];
  readonly attachment: IAttachment;
}
