import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GetPlaylistRequest, GetPlaylistResponse } from "../models/playlist";
import { getPlaylist } from "../apis/playlistApi";

const useGetPlaylist = (params: GetPlaylistRequest): UseQueryResult<GetPlaylistResponse, Error> => {
    return useQuery({
        queryKey: ['playlist-detail', params.playlist_id],
        queryFn: () => getPlaylist(params),
        enabled: !!params.playlist_id,
    })
}

export default useGetPlaylist;
