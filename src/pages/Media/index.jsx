import HomeHeroSection from "../../components/HomeHeroSection";
import FadeUpEffect from "../../components/FadeUpEffect";
import { arrow } from "../../constants/assets";
import styles from "./media.module.css";
import { Helmet } from "react-helmet-async";
import { lazy } from "react";
import useLoadingData from "../../hooks/useLoadingData";
import LoadingScreen from "../../components/LoadingScreen";

const EndSection = lazy(() => import("../../components/EndSection"));

function MediaPage() {
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData("media");

  return (
    <>
      <Helmet>
        <title>News & Events</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <HomeHeroSection
        subtitle={content?.media_section1_title.text}
        title={content?.media_section1_subtitle.text}
        desc={content?.media_section1_body.text}
        videoBg={content?.media_section1_video.text}
        mobileBg={content?.media_section1_video.text}
        setIsMediaLoading={setIsMediaLoading}
      />

      <section className={styles.secondSection}>
        <FadeUpEffect tag="h2">
          {content?.media_section2_title.text}
        </FadeUpEffect>
        <div className={styles.separator}></div>
        <div className={styles.blogPostsContainer}>
          <SingleCard
            department={content?.media_section2_title1.text}
            title={content?.media_section2_subtitle1.text}
            img={content?.media_section2_image1.text}
            link={"/media/news"}
          />
          <SingleCard
            department={content?.media_section2_title2.text}
            title={content?.media_section2_subtitle2.text}
            img={content?.media_section2_image2.text}
            link={"/media/events"}
          />
          <SingleCard
            department={content?.media_section2_title3.text}
            title={content?.media_section2_subtitle3.text}
            img={content?.media_section2_image3.text}
            link={"/media/case-studies"}
          />
          <SingleCard
            department={content?.media_section2_title4.text}
            title={content?.media_section2_subtitle4.text}
            img={content?.media_section2_image4.text}
            link={"/media/testimonials"}
          />
        </div>
      </section>

      <EndSection
        titleIntro={content?.media_section3_title.text}
        title={content?.media_section3_subtitle.text}
        underlinedTitle={content?.media_section3_subtitle2.text}
        content={content?.media_section3_subtitle3.text}
        background={content?.media_section3_image.text}
        isBackgroundImg={true}
        style={1}
      />
    </>
  );
}

export default MediaPage;

function SingleCard({ link, img, department, title }) {
  return (
    <a href={link} className={styles.blogPostCard}>
      <div className={styles.postCardImgBox}>
        <img src={img} alt="blog-post-img" loading="lazy" />
      </div>
      <div className={styles.postCardCont}>
        <div className={styles.blogPostCardCont}>
          <p>{department}</p>
          <h3>{title}</h3>
        </div>
        <div className={styles.blogPostCardFooter}>
          <p>Read more</p>
          <img src={arrow} alt="arrow-icon" loading="lazy" />
        </div>
      </div>
    </a>
  );
}
