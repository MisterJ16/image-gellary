import React from 'react';

import styles from "./Search.module.scss";

export interface IProps {
    onChangedSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = (props: IProps) => {
    const {onChangedSearch} = props;

    return (
            <input type="text" className={styles.search} onInput={onChangedSearch}
                   placeholder="Search by title..."/>
    )
}

export default Search;
