import { Artist } from "./artist";
import { ExternalUrls, ImageObject, Restrictions } from "./commonType";

/**
 * getNewRealeases 응답 인터페이스 (Spotify API)
 */
export interface GetNewReleasesResponse {
  albums: PagingObject<SimplifiedAlbumObject>;
}

/**
 * 페이징 처리를 위한 공통 객체
 */
interface PagingObject<T> {
  href: string;
  items: T[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
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
