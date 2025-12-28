/**
 * 외부 URL 정보
 */
export interface ExternalUrls {
  spotify?: string;
}

/**
 * 이미지 정보
 */
export interface ImageObject {
  url: string;
  height: number | null;
  width: number | null;
}

/**
 * 제한 사항 정보
 */
export interface Restrictions {
  reason?: 'market' | 'product' | 'explicit' | string;
}

/**
 * 팔로워 정보
 */
export interface Followers {
  href: string | null;
  total: number;
}

/**
 * 명시적 콘텐츠 정보
 */
export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}
