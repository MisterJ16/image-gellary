import React from 'react';

import styles from "./Footer.module.scss";

import {FooterContext} from "../../contexts/GalleryContext";

import Paginator from "../UI/Paginator/Paginator";

const Footer = () => {
    const contextFooter: any = React.useContext(FooterContext);

    return (
        <footer className={styles.container}>
            <Paginator cards={contextFooter.cards} page={contextFooter.page} onChangedPage={contextFooter.onChangedPage}></Paginator>
        </footer>
    )
}

export default Footer;
