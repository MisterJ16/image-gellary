import {ICard} from "../contexts/interfaces";
import {DEFAULT_NUMBER_OF_THUMBNAILS} from "../constants/constants";

export const splitCardsByDefaultNumberOfThumbnails = (cards: Array<ICard>, size: number = DEFAULT_NUMBER_OF_THUMBNAILS): Array<Array<ICard>> => {
    if (!cards) return [];

    return Array.from({length: Math.ceil(cards.length / size)}, (_, i) =>
        cards.slice(i * size, i * size + size)
    );
}

export const getAlbumsIds = (cards?: Array<ICard>): Array<number> | any => {
    if(!cards) return [];

    return Array.from(new Set(cards.map((item: ICard) => item.albumId)));
}

export const getCardsBySelectedAlbum = (cards: Array<ICard>, album: number = 0, size: number = DEFAULT_NUMBER_OF_THUMBNAILS): Array<Array<ICard>> => {
    if (!cards) return [];

    if(album === 0) return splitCardsByDefaultNumberOfThumbnails(cards, size);

    const filteredCards: Array<ICard> | any = cards.filter((item: any) => item.albumId === album);

    const splitCards = splitCardsByDefaultNumberOfThumbnails(filteredCards, size)

    return splitCards
}

export const searchCardsByTitle = (cards: Array<ICard>, text: string = "", album: number = 0, size: number = DEFAULT_NUMBER_OF_THUMBNAILS): Array<Array<ICard>> => {
    let filteredCards: Array<ICard> | any = cards;

    if (!cards) return [];

    if(text === "") return splitCardsByDefaultNumberOfThumbnails(cards, size);

    if(album !== 0) filteredCards = cards.filter((item: any) => item.albumId === album);

    filteredCards = filteredCards.filter((item: any) => item.title.search(text) > -1);

    const splitCards = splitCardsByDefaultNumberOfThumbnails(filteredCards, size)

    return splitCards;
}

export const getGuid = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = 16 * Math.random() | 0;
        // eslint-disable-next-line no-mixed-operators
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

