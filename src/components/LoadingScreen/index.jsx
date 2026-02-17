import { mainLogo } from "../../constants/assets";
import styles from "./loadingScreen.module.css";

function LoadingScreen() {
  return (
    <div className={styles.loadingMaskContainer}>
      <img src={mainLogo} width={210} />
    </div>
  );
}

export default LoadingScreen;
