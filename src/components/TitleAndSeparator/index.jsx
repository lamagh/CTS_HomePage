import FadeUpEffect from "../FadeUpEffect";
import styles from "./titleAndSeparator.module.css";

function TitleAndSeparator({ title }) {
  return (
    <div>
      <FadeUpEffect tag="h2" className={styles.title}>
        {title}
      </FadeUpEffect>
      <FadeUpEffect tag="div" className={styles.separator}></FadeUpEffect>
    </div>
  );
}

export default TitleAndSeparator;
