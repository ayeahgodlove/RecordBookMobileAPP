import { IBaseState } from "./base-state.model";
import { IResponseBase } from "./response.base";

export interface ICategory {
  id: string;
  name: string;
}

export const emptyCategory: ICategory = {
  id: "",
  name: "",
};

export interface ICategoryResponse extends IResponseBase {
  data: ICategory;
}

export interface ICategoryState extends IBaseState {
  readonly categories: ICategory[];
  readonly category: ICategory;
}
