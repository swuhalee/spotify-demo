import { ApiResponse } from "./apiResponse";
import { ExternalUrls, Followers, ImageObject, PlaylistOwner } from "./commonType";

export interface GetCurrentUserPlaylistsRequest {
    limit?: number;
    offset?: number;
}

export type GetCurrentUserPlaylistsResponse = ApiResponse<SimplifiedPlaylistObject>;

export interface SimplifiedPlaylistObject {
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
    tracks: {
        href?: string;
        total?: number;
    };
    type: "playlist";
    uri: string;
}
