import React, {useEffect, useState} from "react";
import {AVAILABLE_PAGES} from "../constants/constants";
import {ICard} from "../contexts/interfaces";
import styles from "../components/Footer/Footer.module.scss";

const usePaginator = (contextFooter: any) => {
    const [upperPageBound, setUpperPageBound] = useState(AVAILABLE_PAGES - 1);
    const [lowerPageBound, setLowerPageBound] = useState(0);

    const pagesCount = contextFooter.cards.length - 1;

    const onChangePage = (
        e: any,
        page: number
    ) => {
        e.preventDefault();
        contextFooter.onChangedPage(e, page);
    };

    useEffect(() => {
        if (contextFooter.page === pagesCount) {
            setLowerPageBound(pagesCount - AVAILABLE_PAGES);
            setUpperPageBound(pagesCount);
        } else if (contextFooter.page === 0 && (pagesCount === upperPageBound || contextFooter.page < lowerPageBound)) {
            setLowerPageBound(contextFooter.page);
            setUpperPageBound(AVAILABLE_PAGES - 1);
        } else {
            if (contextFooter.page > upperPageBound) {
                setLowerPageBound(upperPageBound);
                setUpperPageBound(contextFooter.page + AVAILABLE_PAGES - 1);
            } else {
                if (contextFooter.page !== 0 && contextFooter.page <= lowerPageBound) {
                    setLowerPageBound(contextFooter.page - AVAILABLE_PAGES);
                    setUpperPageBound(contextFooter.page);
                }
            }
        }
    }, [contextFooter.page])

    const renderPageNumbers = contextFooter.cards.map((v: ICard, i: number) => {
        if (contextFooter.page === i && i === 0) {
            return (
                <li className={styles.marginBoth} key={i + 1}><span className='selected'>{i + 1}</span></li>
            )
        } else if (contextFooter.page !== i && i === 0 && upperPageBound < AVAILABLE_PAGES) {
            return (
                <li className={styles.marginBoth} key={i + 1}><a onClick={(e) => onChangePage(e, i)}>{i + 1}</a></li>
            )
        } else if (i > lowerPageBound && i <= upperPageBound) {
            if (contextFooter.page === i) {
                return (
                    <li className={styles.marginBoth} key={i + 1}><span className='selected'>{i + 1}</span></li>
                )
            }

            return (
                <li className={styles.marginBoth} key={i + 1}><a onClick={(e) => onChangePage(e, i)}>{i + 1}</a></li>
            )
        }
    });

    return [pagesCount, renderPageNumbers, onChangePage]
}

export default usePaginator;
