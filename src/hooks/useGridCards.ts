import {useEffect, useState} from "react";
import {DEFAULT_NUMBER_OF_THUMBNAILS} from "../constants/constants";
import {ICard} from "../contexts/interfaces";
import {getCardsBySelectedAlbum, splitCardsByDefaultNumberOfThumbnails} from "../utils/utils";
import {isMobile} from "react-device-detect";

export interface IProps {
    data: ICard[];
    albums: number[];
}

export const useGridCards = (props: IProps) => {
    const [cards, setCards] = useState([]);

    const [card, setCard] = useState({
        albumId: null,
        id: null,
        title: null,
        url: null,
        thumbnailUrl: null
    });

    const [page, setPage] = useState(0);

    const [gallery, setGallery] = useState([]);

    const [numberOfThumbnails, setNumberOfThumbnails] = useState(DEFAULT_NUMBER_OF_THUMBNAILS);

    const [album, setAlbum] = useState(0);

    useEffect(() => {
        const cardsByDefaultThumbnails: Array<Array<ICard>> | any = splitCardsByDefaultNumberOfThumbnails(props.data, numberOfThumbnails);
        return setCards(cardsByDefaultThumbnails);
    }, [numberOfThumbnails, props.data])

    useEffect(() => {
        const cardsBySelectedAlbum: Array<Array<ICard>> | any = getCardsBySelectedAlbum(props.data, album, numberOfThumbnails);
        return setCards(cardsBySelectedAlbum);
    }, [album, numberOfThumbnails, props.data])

    useEffect(() => {
        if (isMobile) {
            if (page === 0) {
                setGallery(cards[page]);
            } else {
                setGallery(gallery.concat(cards[page]));
            }
        } else {
            setGallery(cards[page]);
        }
    }, [page, cards, album, numberOfThumbnails])

    const fetchMoreData = () => {
        setTimeout(() => {
            setPage(page + 1);
        }, 1000);
    };

    return {
        cards,
        setCards,
        card,
        setCard,
        numberOfThumbnails,
        setNumberOfThumbnails,
        album,
        setAlbum,
        page,
        setPage,
        gallery,
        setGallery,
        fetchMoreData
    }
}
