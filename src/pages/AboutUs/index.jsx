import FadeUpEffect from "../../components/FadeUpEffect";
import ArrowIcon from "../../components/ArrowIcon";
import Button from "../../components/Button";
import CaseStudyCard from "../../components/CaseStudyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { smallRightArrow, eduliticsBg } from "../../constants/assets";
import styles from "./aboutUs.module.css";
import { lazy, useEffect, useRef, useState } from "react";
import useDisplay from "../../hooks/useDisplay";
import { Helmet } from "react-helmet-async";
import LoadingScreen from "../../components/LoadingScreen";
import useLoadingData from "../../hooks/useLoadingData";

const EndSection = lazy(() => import("../../components/EndSection"));
const TitleAndSeparator = lazy(() =>
  import("../../components/TitleAndSeparator")
);

function AboutUs() {
  const [teamMembers, setTeamMembers] = useState([]);
  const [content, isMediaLoading, setIsMediaLoading] =
    useLoadingData("about-us");

  const fetchInfo = async () => {
    try {
      const url = `/api/TeamMembers`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setTeamMembers(data);
    } catch (error) {
      setIsMediaLoading(true);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const [isMobileDisplay] = useDisplay();
  const swiperRef = useRef();
  const team = [
    {
      img: "/assets/team/1.jpg",
      name: "Bassem Chbaklo",
      role: "CEO",
    },
    {
      img: "/assets/team/2.png",
      name: "Haissam Issa",
      role: "VP",
    },
    {
      img: "/assets/team/5.jpg",
      name: "Abbas Bazzi",
      role: "Director of IT",
    },
    {
      img: "/assets/team/4.jpg",
      name: "AbdulHafiz Kaissi",
      role: "COO",
    },
    {
      img: "/assets/team/3.jpg",
      name: "Majed Mneymneh",
      role: "CGO",
    },
  ];

  console.error(teamMembers);

  const caseStudyCards = [
    {
      img: "/assets/productLogos/aiducator-new.jpg",
      title: "AI-Driven Solutions for Smarter Admissions",
      desc: "AI-powered chatbot that provides 24/7 support to prospective students and parents, delivering personalized assistance and enhancing school websites with modern, intuitive communication.",
    },
    {
      img: "/assets/productLogos/bilarabi-bg.jpg",
      title: "Empowering Arabic Learning with Innovation",
      desc: "BilArabi is an Arabic language program designed to make learning enjoyable and meaningful.",
    },
    {
      img: eduliticsBg,
      title: "Data-Driven Insights for Academic Excellence",
      desc: "EduLytics is a data-driven platform for educational institutions to integrate, cleanse, and analyze multi-source data.",
    },
  ];

  console.error(teamMembers);

  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <section className={styles.heroSection}>
        <video
          autoPlay
          loop
          muted
          playsInline
          key={content?.aboutus_section1_video.text}
          onCanPlayThrough={() => setIsMediaLoading(false)}
        >
          <source
            src={content?.aboutus_section1_video.text}
            type="video/mp4"
            onCanPlayThrough={() => setIsMediaLoading(false)}
          />
        </video>
        <div className={styles.heroContent}>
          <div className={styles.middleBox}>
            <FadeUpEffect tag="h1">
              {content?.aboutus_section1_title.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p">
              {content?.aboutus_section1_subtitle.text}
            </FadeUpEffect>
          </div>
          {!isMobileDisplay && (
            <FadeUpEffect tag="div" className={styles.heroFooter}>
              <ArrowIcon direction="down" />
            </FadeUpEffect>
          )}
        </div>
      </section>

      <section className={styles.secondSection}>
        <div className={styles.titleBox}>
          {!isMobileDisplay ? (
            <FadeUpEffect tag="p" className={styles.subtitle}>
              {content?.aboutus_section2_title.text}
            </FadeUpEffect>
          ) : (
            <TitleAndSeparator title={content?.aboutus_section2_title.text} />
          )}
          <FadeUpEffect tag="h2" className={styles.title}>
            {content?.aboutus_section2_subtitle.text}
          </FadeUpEffect>
        </div>
        <div className={styles.secondSectionContent}>
          <FadeUpEffect tag="div" className={styles.note}>
            <p className={styles.noteTitle}>
              {content?.aboutus_section2_title2.text}
            </p>
            <p className={styles.noteTxt}>
              {content?.aboutus_section2_subtitle2.text}
            </p>
          </FadeUpEffect>
          <div className={styles.secondSectionTxt}>
            <FadeUpEffect tag="p">
              {content?.aboutus_section2_body1.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p">
              {content?.aboutus_section2_body2.text}
            </FadeUpEffect>
            <FadeUpEffect tag="p">
              {content?.aboutus_section2_body3.text}
            </FadeUpEffect>
          </div>
        </div>
      </section>

      <section className={styles.thirdSection}>
        <div className={styles.titleBox}>
          {!isMobileDisplay ? (
            <FadeUpEffect tag="p" className={styles.subtitle}>
              {content?.aboutus_section3_title.text}
            </FadeUpEffect>
          ) : (
            <TitleAndSeparator title={content?.aboutus_section3_title.text} />
          )}
          <FadeUpEffect tag="h2" className={styles.title}>
            {content?.aboutus_section3_subtitle.text}
          </FadeUpEffect>
        </div>
        <div className={styles.thirdSectionContent}>
          <FadeUpEffect tag="p">
            {content?.aboutus_section3_body1.text}
          </FadeUpEffect>
          <FadeUpEffect tag="p">
            {content?.aboutus_section3_body2.text}
          </FadeUpEffect>
          <Button
            onClick={() => window.open("/contact", "_self")}
            id={3}
            img={smallRightArrow}
          >
            Learn more
          </Button>
        </div>
      </section>

      <section className={styles.fourthSection}>
        <div className={styles.upperBox}>
          <FadeUpEffect tag="h2">
            {content?.aboutus_section4_title.text}
          </FadeUpEffect>
          <FadeUpEffect tag="p">
            {content?.aboutus_section4_subtitle.text}
          </FadeUpEffect>
          <FadeUpEffect tag="p">
            {content?.aboutus_section4_body.text}
          </FadeUpEffect>
        </div>

        <div
          style={{
            display: "flex",
            gap: "5%",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {!isMobileDisplay && (
            <div
              className={styles.swiperArrowLeft}
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <ArrowIcon direction="left" color="white" />
            </div>
          )}
          <Swiper
            ref={swiperRef}
            className={styles.swiper}
            slidesPerView={
              isMobileDisplay
                ? "auto"
                : (teamMembers?.length || 0) > 5
                ? 5
                : teamMembers?.length || 0
            }
            spaceBetween={10}
            navigation={{
              nextEl: `${styles.swiperArrowRight}`,
              prevEl: `${styles.swiperArrowLeft}`,
            }}
            modules={[Navigation]}
          >
            {teamMembers.map((e, i) => (
              <SwiperSlide
                className={styles.swiperSlide}
                key={i}
                style={isMobileDisplay ? { width: "60%" } : null}
              >
                <div className={styles.swiperSlideContent}>
                  <img src={e.imageUrl} alt="slide-img" draggable={false} />
                  {e.fullName && (
                    <div className={styles.slideName}>{e.fullName}</div>
                  )}
                  {e.position && (
                    <div className={styles.slideRole}>{e.position}</div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          {!isMobileDisplay && (
            <div
              className={styles.swiperArrowRight}
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <ArrowIcon color="white" />
            </div>
          )}
        </div>
        {isMobileDisplay && (
          <div
            style={{
              marginTop: "2.5rem",
              display: "flex",
              gap: "5%",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div
              className={styles.swiperArrowLeft}
              onClick={() => swiperRef.current.swiper.slidePrev()}
            >
              <ArrowIcon direction="left" color="white" />
            </div>
            <div
              className={styles.swiperArrowRight}
              onClick={() => swiperRef.current.swiper.slideNext()}
            >
              <ArrowIcon color="white" />
            </div>
          </div>
        )}
      </section>

      <section className={styles.fifthSection}>
        <TitleAndSeparator title={content?.aboutus_section5_title.text} />
        <FadeUpEffect tag="div" className={styles.studyCards}>
          {(content?.pageProducts || []).map((e, i) => (
            <CaseStudyCard
              key={i}
              img={e.mainImageUrl}
              title={e.title}
              desc={e.shortDescription}
            />
          ))}
        </FadeUpEffect>
      </section>

      <EndSection
        titleIntro={content?.aboutus_section6_title.text}
        title={content?.aboutus_section6_subtitle.text}
        underlinedTitle={content?.aboutus_section6_subtitle2.text}
        content={content?.aboutus_section6_subtitle3.text}
        background={content?.aboutus_section6_image.text}
        isBackgroundImg={true}
        style={1}
        onClick={() => window.open("/contact", "_self")}
      />
    </>
  );
}

export default AboutUs;
