import React from "react";

import useOutsideClick from "../../../hooks/useOutsideClick"
import styles from "./Albums.module.scss";
import {HeaderContext} from "../../../contexts/GalleryContext";
import {getGuid} from "../../../utils/utils";

export interface IProps {
    show?: boolean;
    albums: number[];
    onHideAlbums: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Albums = (props: IProps) => {
    const contextHeader: any = React.useContext(HeaderContext);

    const ref = React.useRef(null);

    useOutsideClick(ref, props.onHideAlbums);

    const onChangeDropdown = (
        e: any
    ) => {
        e.preventDefault();
        contextHeader.onChangedAlbum(e);
        props.onHideAlbums(e);
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
                {
                    props.albums.map((item: number) => {
                            if (item === contextHeader.album) {
                                return (
                                    <div key={getGuid()} className={styles.selected}>
                                        Album {item}
                                    </div>
                                );
                            } else {
                                return (
                                    <div key={getGuid()} id={item.toString()} onClick={(e) => {
                                        onChangeDropdown(e);
                                    }}>
                                        Album {item}
                                    </div>
                                );
                            }
                        }
                    )
                }
            </div>
        </div>
    );
};

export default Albums;
