import React from 'react';

import styles from "./Footer.module.scss";

import {FooterContext} from "../../contexts/GalleryContext";

import usePaginator from "../../hooks/usePaginator";

const Footer = () => {
    const contextFooter: any = React.useContext(FooterContext);

    const [pagesCount, renderPageNumbers, onChangePage] = usePaginator(contextFooter);

    return (
        <footer className={styles.container}>
            {contextFooter.cards.length !== 0 && (<ul>
                <li key="firstPage">{contextFooter.page !== 0 ? <a onClick={(e) => onChangePage(e, 0)}>{"<<"}</a> :
                    <span className={styles.disabled}>{"<<"}</span>}</li>
                <li className={`${styles.marginLeft} ${styles.marginRight}`} key="prevPage">{contextFooter.page !== 0 ?
                    <a onClick={(e) => onChangePage(e, contextFooter.page - 1)}>{"<"}</a> :
                    <span className={styles.disabled}>{"<"}</span>}</li>
                {renderPageNumbers}
                <li className={styles.marginLeft_2x} key="nextPage">{contextFooter.page !== pagesCount ?
                    <a onClick={(e) => onChangePage(e, contextFooter.page + 1)}>{">"}</a> :
                    <span className={styles.disabled}>{">"}</span>}</li>
                <li className={styles.marginLeft} key="lastPage">{contextFooter.page !== pagesCount ?
                    <a onClick={(e) => onChangePage(e, pagesCount)}>{">>"}</a> :
                    <span className={styles.disabled}>{">>"}</span>}</li>
            </ul>)}
        </footer>
    )
}

export default Footer;
