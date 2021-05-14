import React from "react";
import styles from "./CardWrapper.module.scss";

const Wrapper = (props: any): JSX.Element => {
  return <div className={styles.wrapper}>{props.children}</div>;
};
export default Wrapper;
