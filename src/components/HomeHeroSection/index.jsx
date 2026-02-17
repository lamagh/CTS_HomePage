import styles from "./homeHeroSection.module.css";
import { contactArrow } from "../../constants/assets";
import FadeUpEffect from "../FadeUpEffect";
import ArrowIcon from "../ArrowIcon";
import Button from "../Button";
import useDisplay from "../../hooks/useDisplay";

function HomeHeroSection({
  subtitle,
  title,
  desc,
  videoBg,
  setIsMediaLoading = () => {},
}) {
  const [isMobileDisplay] = useDisplay();

  return (
    <section className={styles.firstSection}>
      <video
        autoPlay
        loop
        muted
        playsInline
        className={styles.heroBackground}
        key={videoBg}
        onCanPlayThrough={() => setIsMediaLoading(false)}
      >
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className={styles.sectionContent}>
        <div>
          <FadeUpEffect tag="p" className={styles.mainSubTitle}>
            {subtitle}
          </FadeUpEffect>
          <FadeUpEffect tag="h1" className={styles.mainTitle}>
            {title}
          </FadeUpEffect>
        </div>
        <FadeUpEffect tag="div" className={styles.rightParagraphCont}>
          {isMobileDisplay && (
            <Button href="#" id={2} img={contactArrow}>
              Contact Us
            </Button>
          )}
          <div className={styles.rightParagraph}>
            <p>{desc}</p>
          </div>
          <ArrowIcon direction="down" />
        </FadeUpEffect>
      </div>
    </section>
  );
}

export default HomeHeroSection;
