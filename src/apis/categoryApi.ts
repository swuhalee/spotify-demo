import { GetCategoriesRequest, GetCategoriesResponse } from "../models/category";
import api from "../utils/api";

export const getCategories = async (params: GetCategoriesRequest): Promise<GetCategoriesResponse> => {
    try {
        const response = await api.get('/browse/categories', { params });
        return response.data.categories;
    } catch (error) {
        throw new Error('Failed to fetch categories');
    }
}
