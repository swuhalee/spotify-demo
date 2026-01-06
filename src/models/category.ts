import { ApiResponse } from "./apiResponse";
import { ImageObject } from "./commonType";

export interface GetCategoriesRequest {
    locale?: string;
    limit?: number;
    offset?: number;
}

export type GetCategoriesResponse = ApiResponse<CategoryObject>;

export interface CategoryObject {
  href: string;
  icons: ImageObject[];
  id: string;
  name: string;
}
