import styles from "./body.module.css";

function Body(props) {
  return <main className={styles.container}>{props.children}</main>;
}

export default Body;
