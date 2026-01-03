import { SimplifiedAlbumObject } from "./album";
import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { SimplifiedPlaylistObject } from "./playlist";
import { ShowObject, SimplifiedAudiobookObject, SimplifiedEpisodeObject, TrackObject } from "./track";

export const enum SEARCH_TYPE {
    Track = 'track',
    Album = 'album',
    Playlist = 'playlist',
    Show = 'show',
    Episode = 'episode',
    Audiobook = 'audiobook',
    Artist = 'artist',
}

export interface SearchRequestParams {
    q: string;
    type: SEARCH_TYPE[];
    market?: string;
    limit?: number;
    offset?: number;
    include_external?: string;
}

export interface SearchResponse {
    artists?: ApiResponse<Artist>;
    albums?: ApiResponse<SimplifiedAlbumObject>;
    tracks?: ApiResponse<TrackObject>;
    playlists?: ApiResponse<SimplifiedPlaylistObject>;
    shows?: ApiResponse<ShowObject>;
    episodes?: ApiResponse<SimplifiedEpisodeObject>;
    audiobooks?: ApiResponse<SimplifiedAudiobookObject>;
}
