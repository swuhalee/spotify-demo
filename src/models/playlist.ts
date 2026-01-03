import { ApiResponse } from "./apiResponse";
import { ExternalUrls, ImageObject, PlaylistOwner } from "./commonType";
import { EpisodeObject, TrackObject } from "./track";

export interface GetCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface BasePlaylist {
    collaborative: boolean;
    description: string | null;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    owner: PlaylistOwner;
    public: boolean | null;
    snapshot_id: string;
    type: "playlist";
    uri: string;
}

export interface SimplifiedPlaylistObject extends BasePlaylist {
    tracks: {
        href?: string;
        total?: number;
    };
}

export interface GetPlaylistRequest {
    playlist_id: string;
    market?: string;
    fields?: string;
    additional_types?: string;
}

export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    limit?: number;
    offset?: number;
}

export interface GetPlaylistResponse extends BasePlaylist {
    tracks: ApiResponse<BasePlaylistTrackObject<TrackObject>>
}

export type GetPlaylistItemsResponse = ApiResponse<BasePlaylistTrackObject<TrackObject | EpisodeObject>>

export interface BasePlaylistTrackObject<T> {
    added_at?: string;
    added_by?: AddedByUser;
    is_local: boolean;
    track: T;
}

export interface AddedByUser {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
}

export interface CreatePlaylistRequest {
    name: string;
    playlist_public?: boolean;
    collaborative?: boolean;
    description?: string;
}

export interface CreatePlaylistResponse extends BasePlaylist {
    tracks: ApiResponse<BasePlaylistTrackObject<TrackObject | EpisodeObject>>;
}