import { useInfiniteQuery } from "@tanstack/react-query";
import { getCategories } from "../apis/categoryApi";
import { GetCategoriesRequest } from "../models/category";
import useClientCredentialToken from "./useClientCredentialToken";

const useGetCategories = (params: GetCategoriesRequest) => {
    const clientCredentialToken = useClientCredentialToken();

    return useInfiniteQuery({
        queryKey: ['categories', params],
        queryFn: ({ pageParam = 0 }) => {
            if (!clientCredentialToken) {
                throw new Error('Client credential token is undefined');
            }
            return getCategories(clientCredentialToken, { offset: pageParam, ...params });
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
