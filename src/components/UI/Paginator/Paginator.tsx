import React from 'react';

import styles from "./Paginator.module.scss";

import usePaginator from "../../../hooks/usePaginator";
import {ICard} from "../../../contexts/interfaces";


export interface IProps {
    children?: React.ReactNode;
    cards: ICard[];
    page: number;
    onChangedPage: (e: React.ChangeEvent, page: number) => void;
}

const Footer = (props: IProps) => {
    const {cards, page, onChangedPage} = props;

    const [pagesCount, renderPageNumbers, onChangePage, children] = usePaginator(cards, page, onChangedPage);

    return (
        <>
            {children}
            {cards.length !== 0 && (
                <ul>
                    <li key="firstPage">{page !== 0 ? <a href="#/" onClick={(e) => onChangePage(e, 0)}>{"<<"}</a> :
                        <span className={styles.disabled}>{"<<"}</span>}</li>
                    <li className={`${styles.marginLeft} ${styles.marginRight}`} key="prevPage">{page !== 0 ?
                        <a href="#/" onClick={(e) => onChangePage(e, page - 1)}>{"<"}</a> :
                        <span className={styles.disabled}>{"<"}</span>}</li>
                    {renderPageNumbers}
                    <li className={styles.marginLeft_2x} key="nextPage">{page !== pagesCount ?
                        <a href="#/" onClick={(e) => onChangePage(e, page + 1)}>{">"}</a> :
                        <span className={styles.disabled}>{">"}</span>}</li>
                    <li className={styles.marginLeft} key="lastPage">{page !== pagesCount ?
                        <a href="#/" onClick={(e) => onChangePage(e, pagesCount)}>{">>"}</a> :
                        <span className={styles.disabled}>{">>"}</span>}</li>
                </ul>
            )}
        </>
    )
}

export default Footer;
