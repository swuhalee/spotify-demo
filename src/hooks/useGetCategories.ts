import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";
import { GetCategoriesRequest } from "../models/category";

const useGetCategories = (params: GetCategoriesRequest) => {
    return useInfiniteQuery({
        queryKey: ['categories', params],
        queryFn: ({ pageParam = 0 }) => {
            return getCategories({ offset: pageParam, ...params });
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage) => {
            if (lastPage.next) {
                const url = new URL(lastPage.next);
                const nextOffset = url.searchParams.get('offset');
                return nextOffset ? parseInt(nextOffset) : undefined;
            }
            return undefined;
        },
    });
}

export default useGetCategories;
