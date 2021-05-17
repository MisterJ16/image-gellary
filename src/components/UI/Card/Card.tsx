import React from 'react';

import {ICard} from "../../../contexts/interfaces";
import styles from "./Card.module.scss";
import {getGuid} from "../../../utils/utils";

export interface IProps {
    card: ICard;
    key: string;
    onSelectCard: (e: React.ChangeEvent<HTMLInputElement>, card: ICard) => void;
}

const Card = (props: IProps) => {
    const {card: {thumbnailUrl, title}} = props;

    return (
        <div className={styles.card} onClick={(e: any) => props.onSelectCard(e, props.card)} key={getGuid()}>
            <img className={styles.cardImage} src={thumbnailUrl} alt={thumbnailUrl}/>
            <div className={styles.cardTitle}>{title}</div>
        </div>
    )
}

export default Card;
