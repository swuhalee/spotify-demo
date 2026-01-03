import { CreatePlaylistRequest, CreatePlaylistResponse, GetCurrentUserPlaylistsRequest, GetCurrentUserPlaylistsResponse, GetPlaylistItemsRequest, GetPlaylistItemsResponse, GetPlaylistRequest, GetPlaylistResponse } from "../models/playlist";
import api from "../utils/api";

export const getCurrentUserPlaylists = async ({ limit, offset }: GetCurrentUserPlaylistsRequest): Promise<GetCurrentUserPlaylistsResponse> => {
    try {
        const response = await api.get('/me/playlists', {
            params: { limit, offset },
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch current user playlists');
    }
}

export const getPlaylist = async (params: GetPlaylistRequest): Promise<GetPlaylistResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}`, {
            params,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch playlist');
    }
}

export const getPlaylistItems = async (params: GetPlaylistItemsRequest): Promise<GetPlaylistItemsResponse> => {
    try {
        const response = await api.get(`/playlists/${params.playlist_id}/tracks`, {
            params,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch playlist items');
    }
}

export const createPlaylist = async (user_id: string, params: CreatePlaylistRequest): Promise<CreatePlaylistResponse> => {
    try {
        const { name, playlist_public, collaborative, description } = params;
        const response = await api.post(`/users/${user_id}/playlists`, {
            name,
            public: playlist_public,
            collaborative,
            description,
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to create playlist');
    }
}