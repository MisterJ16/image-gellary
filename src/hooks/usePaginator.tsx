import React, {useEffect, useState} from "react";
import {AVAILABLE_PAGES} from "../constants/constants";
import {ICard} from "../contexts/interfaces";
import styles from "../components/UI/Paginator/Paginator.module.scss";
import {getGuid} from "../utils/utils";

const usePaginator = (cards: ICard[], page: number, onChangedPage: any) => {
    const [upperPageBound, setUpperPageBound] = useState(AVAILABLE_PAGES - 1);

    const [lowerPageBound, setLowerPageBound] = useState(0);

    const pagesCount: number = cards.length - 1;

    const onChangePage = (
        e: any,
        page: number
    ): void => {
        e.preventDefault();
        onChangedPage(e, page);
    };

    useEffect(() => {
        if (page === pagesCount) {
            setLowerPageBound(pagesCount - AVAILABLE_PAGES);
            setUpperPageBound(pagesCount);
        } else if (page === 0 && (pagesCount === upperPageBound || page < lowerPageBound)) {
            setLowerPageBound(page);
            setUpperPageBound(AVAILABLE_PAGES - 1);
        } else {
            if (page > upperPageBound) {
                setLowerPageBound(upperPageBound);
                setUpperPageBound(page + AVAILABLE_PAGES - 1);
            } else {
                if (page !== 0 && page <= lowerPageBound) {
                    setLowerPageBound(page - AVAILABLE_PAGES);
                    setUpperPageBound(page);
                }
            }
        }
    }, [lowerPageBound, page, pagesCount, upperPageBound])

    const renderPageNumbers: any = cards.map((v: ICard, i: number) => {
        if (page === i && i === 0) {
            return (
                <li className={styles.marginBoth} key={getGuid()}><span className='selected'>{i + 1}</span></li>
            )
        } else if (page !== i && i === 0 && upperPageBound < AVAILABLE_PAGES) {
            return (
                <li className={styles.marginBoth} key={getGuid()}>
                    <a href="#/" onClick={(e) => onChangePage(e, i)}>{i + 1}</a>
                </li>
            )
        } else if (i > lowerPageBound && i <= upperPageBound) {
            if (page === i) {
                return (
                    <li className={styles.marginBoth} key={getGuid()}><span className='selected'>{i + 1}</span></li>
                )
            }

            return (
                <li className={styles.marginBoth} key={getGuid()}>
                    <a href="#/" onClick={(e) => onChangePage(e, i)}>{i + 1}</a>
                </li>
            )
        } else {
            return false;
        }
    });

    return [pagesCount, renderPageNumbers, onChangePage]
}

export default usePaginator;
