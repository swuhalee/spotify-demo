import { ApiResponse } from "./apiResponse";
import { Artist } from "./artist";
import { ExternalUrls, ImageObject, Restrictions } from "./commonType";

/**
 * getNewRealeases 응답 인터페이스 (Spotify API)
 */
export interface GetNewReleasesResponse {
  albums: ApiResponse<SimplifiedAlbumObject>;
}

/**
 * 앨범 객체
 */
export interface SimplifiedAlbumObject {
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
