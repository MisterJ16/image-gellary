import React, {useEffect, useState} from 'react';
import {isMobile} from "react-device-detect";

import CardComponent from "../UI/Card/CardComponent";
import {FooterContext, GalleryContext, HeaderContext} from "../../contexts/GalleryContext";
import {getCardsBySelectedAlbum, searchCardsByTitle, splitCardsByDefaultNumberOfThumbnails} from "../../utils/utils";
import {DEFAULT_NUMBER_OF_THUMBNAILS} from "../../constants/constants";
import {ICard} from "../../contexts/interfaces";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./CardsGrid.module.scss";
import {setBodyOverflow} from "../../utils/dom";
import CardWrapper from "../UI/CardWrapper/CardWrapper";
import Modal from "../UI/Modal/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import {getGuid} from "../../utils/utils"

const CardsGrid = () => {
    const contextCards: any = React.useContext(GalleryContext);

    const [modal, setModal] = React.useState(false);

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
        const cardsByDefaultThumbnails: Array<Array<ICard>> | any = splitCardsByDefaultNumberOfThumbnails(contextCards.data, numberOfThumbnails);
        return setCards(cardsByDefaultThumbnails);
    }, [numberOfThumbnails])

    const onChangedThumbnails = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        e.preventDefault();
        return setNumberOfThumbnails(+value);
    }

    const onChangedAlbum = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        e.preventDefault();
        return setAlbum(+value);
    }

    useEffect(() => {
        const cardsBySelectedAlbum: Array<Array<ICard>> | any = getCardsBySelectedAlbum(contextCards.data, album, numberOfThumbnails);
        return setCards(cardsBySelectedAlbum);
    }, [album])

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

    const onClearAlbum = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        return setAlbum(0);
    }

    const onChangedSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const cardsBySearchTitle: Array<Array<ICard>> | any = searchCardsByTitle(contextCards.data, e.currentTarget.value, album, numberOfThumbnails);
        return setCards(cardsBySearchTitle);
    }

    const onChangedPage = (e: React.ChangeEvent<HTMLInputElement>, page: number) => {
        e.preventDefault();
        return setPage(page);
    }

    const onSelectedCard = (e: React.ChangeEvent<HTMLInputElement>, card: ICard | any) => {
        e.preventDefault();
        return setCard(card);
    }

    useEffect(() => {
        card && card.id !== null && onModalShow();
    }, [card, setCard])

    const onModalShow = (event?: React.ChangeEvent<HTMLInputElement>) => {
        event && event.preventDefault();
        setBodyOverflow(true);
        return setModal(true);
    };

    const onModalHide = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setBodyOverflow();
        setCard({
            albumId: null,
            id: null,
            title: null,
            url: null,
            thumbnailUrl: null
        });
        return setModal(false);
    };

    const header = {
        numberOfThumbnails,
        onChangedThumbnails,
        album,
        onChangedAlbum,
        onClearAlbum,
        onChangedSearch,
        page,
        onChangedPage
    }

    const footer = {
        cards,
        page,
        onChangedPage
    }

    const fetchMoreData = () => {
        setTimeout(() => {
            setPage(page + 1);
        }, 1000);
    };

    return (
        <>

            <HeaderContext.Provider value={header}>
                <Header/>
            </HeaderContext.Provider>
            {
                !isMobile && gallery && gallery.length > 0 && (
                    <main className={styles.container}>
                        {
                            gallery.map((card: ICard) => <CardComponent key={getGuid()} card={card}
                                                                                   onSelectCard={onSelectedCard}/>)
                        }
                    </main>
                )
            }
            {
                isMobile && gallery && gallery.length > 0 && (
                    <InfiniteScroll
                        dataLength={gallery.length}
                        next={fetchMoreData}
                        hasMore={page < cards.length - 1}
                        loader={<h4>Loading...</h4>}

                    >
                        <main className={styles.container}>
                            {
                                gallery.map((card: ICard) => <CardComponent key={getGuid()} card={card}
                                                                                       onSelectCard={onSelectedCard}/>)
                            }
                        </main>
                    </InfiniteScroll>
                )
            }

            <FooterContext.Provider value={footer}>
                <Footer/>
            </FooterContext.Provider>
            {modal && <Modal show={modal} onModalHide={onModalHide}>
                <CardWrapper>
                    <img src={card.url!} alt={card.title!}/>
                </CardWrapper>
            </Modal>}
        </>

    )
}

export default CardsGrid;
