import { ExternalUrls } from "./commonType";

/**
 * 아티스트 정보
 */
export interface Artist {
  external_urls?: ExternalUrls;
  href?: string;
  id?: string;
  name?: string;
  type?: 'artist';
  uri?: string;
}
