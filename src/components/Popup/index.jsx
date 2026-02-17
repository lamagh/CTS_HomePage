import styles from "./popup.module.css";

function Popup({ onClick, children }) {
  return (
    <div className={styles.popupContainer}>
      <div className={styles.popupForm}>
        <div className={styles.closeButtonCont} onClick={onClick}>
          X
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Popup;
