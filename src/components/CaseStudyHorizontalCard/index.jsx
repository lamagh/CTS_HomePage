import { arrow } from "../../constants/assets";
import styles from "./caseStudyHorizontalCard.module.css";
import FadeUpEffect from "../FadeUpEffect";

function CaseStudyHorizontalCard({ img, title, desc, link }) {
  return (
    <FadeUpEffect tag="div" className={styles.card}>
      <div className={styles.imgContainer}>
        <img src={img} alt="card-img" />
      </div>
      <p className={styles.cardTitle}>{title}</p>
      <p className={styles.description}>{desc}</p>
      <div className={styles.readMoreCont}>
        <p>Read more</p>
        <img src={arrow} alt="arrow right" width={15} height={15} />
      </div>
    </FadeUpEffect>
  );
}

export default CaseStudyHorizontalCard;
