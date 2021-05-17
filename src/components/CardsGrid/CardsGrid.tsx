import React from 'react';
import {isMobile} from "react-device-detect";

import Card from "../UI/Card/Card";
import {FooterContext, GalleryContext, HeaderContext} from "../../contexts/GalleryContext";
import {searchCardsByTitle} from "../../utils/utils";
import {ICard} from "../../contexts/interfaces";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./CardsGrid.module.scss";
import {setBodyOverflow} from "../../utils/dom";
import CardWrapper from "../UI/CardWrapper/CardWrapper";
import Modal from "../UI/Modal/Modal";
import InfiniteScroll from "react-infinite-scroll-component";
import {getGuid} from "../../utils/utils"
import {useGridCards} from "../../hooks/useGridCards";

const CardsGrid = () => {
    const contextCards: any = React.useContext(GalleryContext);

    const [modal, setModal] = React.useState(false);

    const {
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
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        setGallery,
        fetchMoreData
    } = useGridCards(contextCards)


    const onChangedThumbnails = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        e.preventDefault();
        return setNumberOfThumbnails(+e.currentTarget.id);
    }

    const onChangedAlbum = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
        e.preventDefault();
        return setAlbum(+e.currentTarget.id);
    }

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

    React.useEffect(() => {
        card && card.id !== null && onModalShow();
    }, [card, setCard])

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

    return (
        <>
            <HeaderContext.Provider value={header}>
                <Header/>
            </HeaderContext.Provider>
            {
                !isMobile && gallery && gallery.length > 0 && (
                    <main className={styles.container}>
                        {
                            gallery.map((card: ICard) => <Card key={getGuid()} card={card}
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
                                gallery.map((card: ICard) => <Card key={getGuid()} card={card}
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
