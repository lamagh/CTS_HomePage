import styles from "./contactSection.module.css";
import FadeUpEffect from "../FadeUpEffect";
import Button from "../Button";

import { arrowRight } from "../../constants/assets";
import useDisplay from "../../hooks/useDisplay";

function ContactSection({
  title,
  underlinedTitle,
  desc,
  url,
  isVideoBackground,
  onClick,
}) {
  const [isMobileDisplay] = useDisplay();

  return (
    <section className={styles.contactSection}>
      {isVideoBackground ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.videoBackground}
          id={url}
          key={url}
        >
          <source src={url} type="video/mp4" />
        </video>
      ) : (
        <img src={url} alt="aiducator background" loading="lazy" />
      )}
      <div className={styles.ContactSectionContainer}>
        <FadeUpEffect tag="h2">
          {title} <br />
          <span>{underlinedTitle}</span>
        </FadeUpEffect>
        {isMobileDisplay && (
          <FadeUpEffect
            tag="div"
            className={styles.mobileContactSectionContent}
          >
            <p>{desc}</p>
            <div className={styles.dividerHorizontal}></div>

            <Button onClick={onClick} id={1} img={arrowRight}>
              Contact Us
            </Button>
          </FadeUpEffect>
        )}
        {!isMobileDisplay && (
          <FadeUpEffect tag="div" className={styles.ContactSectionContent}>
            <Button onClick={onClick} id={1} img={arrowRight}>
              Contact Us
            </Button>

            <div className={styles.divider}></div>
            <p>{desc}</p>
          </FadeUpEffect>
        )}
      </div>
    </section>
  );
}

export default ContactSection;
