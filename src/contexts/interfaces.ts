export interface IResponse {
    data?: Array<ICard>;
    error?: string;
}

export interface ICard {
    albumId?: number;
    id: number;
    title: string;
    url?: string;
    thumbnailUrl?: string;
}
