import React from "react";

import useOutsideClick from "../../hooks/useOutsideClick";
import styles from "./Thumbnails.module.scss";
import {NUMBER_OF_THUMBNAILS} from "../../constants/constants";
import {HeaderContext} from "../../contexts/GalleryContext";
import {getGuid} from "../../utils/utils";

export interface IProps {
    show?: boolean;
    onHideDropdown: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Thumbnails = (props: IProps) => {
    const contextHeader: any = React.useContext(HeaderContext);

    const ref = React.useRef(null);

    useOutsideClick(ref, props.onHideDropdown);

    const onChangeDropdown = (
        e: any
    ) => {
        e.preventDefault();
        contextHeader.onChangedThumbnails(e, e.currentTarget.id);
        props.onHideDropdown(e);
    };

    return (
        <div
            className={styles.dropup}
            style={{
                transform: props.show ? "translateY(100%)" : "translateY(0)",
                opacity: props.show ? "1" : "0",
            }}
            ref={ref}
        >
            <div className={`${styles.container} ${styles.arrowTop}`}>
                <ul>
                    {
                        NUMBER_OF_THUMBNAILS.map((item: number) => {
                                if (item === contextHeader.numberOfThumbnails) {
                                    return (
                                        <li key={getGuid()} className={styles.selected}>
                                            {item}
                                        </li>
                                    );
                                } else {
                                    return (
                                        <li key={getGuid()} id={item.toString()} onClick={(e) => {
                                            onChangeDropdown(e);
                                        }}>
                                            {item}
                                        </li>
                                    );
                                }
                            }
                        )
                    }
                </ul>
            </div>
        </div>
    );
};

export default Thumbnails;
