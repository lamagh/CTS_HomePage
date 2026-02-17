import Button from "../Button";
import { contactArrow } from "../../constants/assets";
import FadeUpEffect from "../FadeUpEffect";
import styles from "./endSection.module.css";
import useDisplay from "../../hooks/useDisplay";

function EndSection({
  titleIntro,
  title,
  underlinedTitle,
  content,
  background,
  titleMobile,
  underlinedTitleMobile,
  contentMobile,
  backgroundMobile,
  isBackgroundImg,
  style,
  onClick,
}) {
  const [isMobileDisplay] = useDisplay();

  return (
    <section className={styles.contactSection}>
      {isBackgroundImg && (
        <img
          src={background}
          alt="contact-section-bg"
          loading="lazy"
          style={
            isMobileDisplay
              ? { objectPosition: "center" }
              : { objectPosition: "right" }
          }
        />
      )}
      <div className={styles.contactSectionCont}>
        <div className={styles.contactSectionHeader}>
          {titleIntro && <p>{titleIntro}</p>}
          <FadeUpEffect
            tag="h2"
            className={style == "1" ? styles.biggerHeader : ""}
          >
            {title} <br />
            <span>{underlinedTitle}</span>
          </FadeUpEffect>
        </div>
        <FadeUpEffect tag="div" className={styles.contactSectionLowerBox}>
          <Button onClick={onClick} id={1} img={contactArrow}>
            Contact Us
          </Button>
          <div className={styles.separator}></div>
          <p>{content}</p>
        </FadeUpEffect>
      </div>
    </section>
  );
}

export default EndSection;
