import { arrowRight } from "../../constants/assets";
import styles from "./arrowIcon.module.css";

function ArrowIcon({ direction, color }) {
  return (
    <div
      className={`${styles.icon} ${direction == "down" ? styles.downDir : ""} ${
        direction == "up" ? styles.upDir : ""
      } ${direction == "left" ? styles.leftDir : ""} ${
        color == "white" ? styles.whiteCol : ""
      }`}
    >
      <img src={arrowRight} alt="right arrow" />
    </div>
  );
}

export default ArrowIcon;
