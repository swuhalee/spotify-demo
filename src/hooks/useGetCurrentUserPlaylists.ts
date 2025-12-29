import { useInfiniteQuery } from "@tanstack/react-query";
import { getCurrentUserPlaylists } from "../apis/playlistApi";
import { GetCurrentUserPlaylistsRequest } from "../models/playlist";

const useGetCurrentUserPlaylists = ({ limit, offset }: GetCurrentUserPlaylistsRequest) => {
    const accessToken = localStorage.getItem('access_token');

    return useInfiniteQuery({
        queryKey: ['current-user-playlists'],
        queryFn: ({ pageParam = 0 }) => getCurrentUserPlaylists({ limit, offset: pageParam }),
        enabled: !!accessToken,
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
};

export default useGetCurrentUserPlaylists;
