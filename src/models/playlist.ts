import { ApiResponse } from "./apiResponse";
import { ExternalUrls, ImageObject, PlaylistOwner, Restrictions } from "./commonType";
import { Artist } from "./artist";

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

export interface GetPlaylistResponse extends BasePlaylist {
    tracks: ApiResponse<PlaylistTrackObject>
}

export interface AddedByUser {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: "user";
    uri: string;
}

export interface ExternalIds {
    isrc?: string;
    ean?: string;
    upc?: string;
}

export interface TrackAlbumObject {
    album_type: 'album' | 'single' | 'compilation';
    total_tracks: number;
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    restrictions?: Restrictions;
    type: 'album';
    uri: string;
    artists: Artist[];
}

export interface TrackObject {
    album: TrackAlbumObject;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_playable: boolean;
    linked_from: Record<string, any>;
    restrictions?: Restrictions;
    name: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
}

export interface PlaylistTrackObject {
    added_at: string;
    added_by: AddedByUser;
    is_local: boolean;
    track: TrackObject;
}
