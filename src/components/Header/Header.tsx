import React from 'react';

import styles from "./Header.module.scss";

import Thumbnails from "../Thumbnails/Thumbnails";
import {GalleryContext, HeaderContext} from "../../contexts/GalleryContext";
import Albums from "../Albums/Albums";
import close from "../../assets/images/close.svg";

const Header = () => {
    const contextHeader: any = React.useContext(HeaderContext);

    const contextCards: any = React.useContext(GalleryContext);

    const [showDropdown, setShowDropdown] = React.useState(false);

    const [showAlbums, setShowAlbums] = React.useState(false);

    const onShowDropdown = (
        event: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        event.preventDefault();
        setShowDropdown(true);
    };

    const onHideDropdown = (
        event: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        event.preventDefault();
        setShowDropdown(false);
    };

    const onShowAlbums = (
        event: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        event.preventDefault();
        setShowAlbums(true);
    };

    const onHideAlbums = (
        event: React.ChangeEvent<HTMLInputElement> | any
    ) => {
        event.preventDefault();
        setShowAlbums(false);
    };

    return (
        <header className={styles.container}>
            <div>
                {showDropdown && (
                    <Thumbnails show={showDropdown} onHideDropdown={onHideDropdown}/>
                )}
                <span onClick={onShowDropdown}>{contextHeader.numberOfThumbnails}</span>
                {showAlbums && (
                    <Albums show={showAlbums} onHideAlbums={onHideAlbums} albums={contextCards.albums}/>
                )}
                <span
                    onClick={onShowAlbums}>{contextHeader.album === 0 ? 'Albums...' : `Album ${contextHeader.album}`}</span>
                {contextHeader.album !== 0 && <img src={close} onClick={contextHeader.onClearAlbum} alt="clear"/>}
            </div>
            <input type="text" className={styles.search} onInput={contextHeader.onChangedSearch}
                   placeholder="Search by title..."/>
        </header>
    )
}

export default Header;
