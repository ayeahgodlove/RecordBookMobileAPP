export interface IResponseBase {
  success: boolean;
  message: string;
  validationErrors: string[];
  hasErrors: boolean;
}

export const emptyResponseBase: IResponseBase = {
  success: false,
  message: "",
  validationErrors: [],
  hasErrors: false,
};
