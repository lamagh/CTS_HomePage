import FadeUpEffect from "../FadeUpEffect";
import styles from "./serviceCard.module.css";

function ServiceCard({ img, title, description, link }) {
  return (
    <FadeUpEffect tag="div" offset={50} className={styles.container}>
      <div>
        <img src={img} alt="service-img" />
      </div>
      <p className={styles.title}>{title}</p>
      <p className={styles.description}>{description}</p>
    </FadeUpEffect>
  );
}

export default ServiceCard;
