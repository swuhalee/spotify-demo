import { ExplicitContent, ExternalUrls, Followers, ImageObject } from "./commonType";

export interface User {
    country?: string;
    display_name: string | null;
    email?: string;
    explicit_content?: ExplicitContent;
    external_urls: ExternalUrls;
    followers: Followers;
    href: string;
    id: string;
    images: ImageObject[];
    product?: string;
    type: "user";
    uri: string;
}
