import FadeUpEffect from '../FadeUpEffect';
import Button from '../Button';
import { smallRightArrow } from '../../constants/assets';
import styles from './heroSection.module.css';
import ArrowIcon from '../ArrowIcon';

function HeroSection({
  title,
  subTitle,
  description,
  image,
  isDarkMode,
  onClick,
  bool = true,
  prefix,
  headline,
}) {
  return (
    <section
      className={`${styles.firstSection} ${isDarkMode ? styles.darkMode : ''}`}
    >
      <img className={styles.heroBackground} src={image} alt='cubes-bg' />
      <div
        className={`${styles.sectionContent} ${
          bool === false ? styles.lowerSectionMain : ''
        }`}
      >
        <div className={styles.upperSection}>
          <div className={styles.newsSection}>
            {prefix && <p className={styles.newsPrefix}>{prefix}</p>}
            {prefix && headline && <span>/</span>}
            {headline && (
              <p
                className={styles.newsHeadline}
                style={{ color: 'rgba(255, 255, 255, 0.5)' }}
              >
                {headline}
              </p>
            )}
          </div>

          <FadeUpEffect tag='p' className={styles.mainSubTitle}>
            {subTitle}
          </FadeUpEffect>
          <FadeUpEffect tag='h1' className={styles.mainTitle}>
            {title}
          </FadeUpEffect>
        </div>
        <div className={styles.lowerSection}>
          {bool === true && (
            <Button href='#' id={2} img={smallRightArrow} onClick={onClick}>
              Book a Demo
            </Button>
          )}

          <FadeUpEffect tag='p' className={styles.lowerSectionContent}>
            {description}
          </FadeUpEffect>
        </div>
        <div className={styles.arrowDownDiv}>
          <ArrowIcon direction='down' color='white' />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
