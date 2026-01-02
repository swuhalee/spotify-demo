import { Artist } from "./artist";
import { ExternalUrls, ImageObject, Restrictions } from "./commonType";

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
    name?: string;
    popularity: number;
    preview_url: string | null;
    track_number: number;
    type: "track";
    uri: string;
    is_local: boolean;
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

export interface EpisodeObject {
    description: string;
    html_description: string;
    duration_ms: number;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    is_playable: boolean;
    languages: string[];
    name: string;
    release_date: string;
    release_date_precision: 'year' | 'month' | 'day';
    resume_point: ResumePoint;
    type: "episode";
    uri: string;
    restrictions?: Restrictions;
    show: ShowObject;
}

export interface ResumePoint {
    fully_played: boolean;
    resume_position_ms: number;
}

export interface ShowObject {
    available_markets: string[];
    copyrights: CopyrightObject[];
    description: string;
    html_description: string;
    explicit: boolean;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: ImageObject[];
    is_externally_hosted: boolean;
    languages: string[];
    media_type: string;
    name: string;
    publisher: string;
    type: "show";
    uri: string;
    total_episodes: number;
}

export interface CopyrightObject {
    text: string;
    type: "C" | "P";
}
