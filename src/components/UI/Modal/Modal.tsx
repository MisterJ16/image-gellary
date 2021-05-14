import React from "react";
import useOutsideClick from "../../../hooks/useOutsideClick";
import styles from "./Modal.module.scss";

export interface IProps {
    show?: boolean;
    children: React.ReactNode;
    onModalHide?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Modal = (props: IProps) => {
    const ref = React.useRef(null);

    useOutsideClick(ref, props.onModalHide);

    return (
        <>
            <div
                className={styles.modal}
                style={{
                    transform: props.show ? "translateY(0)" : "translateY(-100vh)",
                    opacity: props.show ? "1" : "0",
                }}
                ref={ref}
            >
                {props.children}
            </div>
            <div
                className={`${styles.overlay} ${!props.show && styles.closed}`}
            ></div>
        </>
    );
};

export default Modal;
