import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemsToPlaylist } from "../apis/playlistApi";
import { AddItemsToPlaylistRequest } from "../models/playlist";

const useAddItemsToPlaylist = (params: AddItemsToPlaylistRequest, playlist_id?: string) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => {
            if (playlist_id) {
                return addItemsToPlaylist(playlist_id, params);
            }
            return Promise.reject(new Error('Playlist ID is undefined'));
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['playlist-detail', playlist_id] });
            queryClient.invalidateQueries({ queryKey: ['current-user-playlists'] });
            queryClient.invalidateQueries({ queryKey: ['playlist-items', { playlist_id }] });
        }
    })
}

export default useAddItemsToPlaylist;
