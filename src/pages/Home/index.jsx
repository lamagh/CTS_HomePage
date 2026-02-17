import { Autoplay } from "swiper/modules";
import { smallRightArrow } from "../../constants/assets";
import styles from "./home.module.css";
import LoadingScreen from "../../components/LoadingScreen";
import FadeUpEffect from "../../components/FadeUpEffect";
import Button from "../../components/Button";
import useDisplay from "../../hooks/useDisplay";
import { Swiper, SwiperSlide } from "swiper/react";
import useLoadingData from "../../hooks/useLoadingData";
import HomeHeroSection from "../../components/HomeHeroSection";
import { Helmet } from "react-helmet-async";
import { lazy, useMemo } from "react";

const EndSection = lazy(() => import("../../components/EndSection"));
const ContactSection = lazy(() => import("../../components/ContactSection"));
const ProductCard = lazy(() => import("../../components/ProductCard"));
const NumberCounter = lazy(() => import("../../components/NumberCounter"));
const TitleAndSeparator = lazy(() =>
  import("../../components/TitleAndSeparator")
);

function HomePage() {
  const [isMobileDisplay] = useDisplay();
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData("home");

  const newLogos = useMemo(
    () =>
      Object.entries(content || {})
        .filter(([key]) => key.includes("_logo_"))
        .map(([_, value]) => value.text),
    [content]
  );

  return (
    <>
      <Helmet>
        <title>CTS</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <HomeHeroSection
        title={content?.home_section1_title.text}
        desc={content?.home_section1_subtitle.text}
        videoBg={content?.home_section1_video.text}
        setIsMediaLoading={setIsMediaLoading}
      />

      <section className={styles.secondSection}>
        <FadeUpEffect tag="h2">
          {content?.home_section2_title.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.home_section2_subtitle.text}
        </FadeUpEffect>
        <FadeUpEffect tag="div" className={styles.learnMoreBtn}>
          <Button
            onClick={() => window.open("/contact", "_self")}
            id={3}
            img={smallRightArrow}
          >
            Learn more
          </Button>
        </FadeUpEffect>
        <div className={styles.kpiContainer}>
          <NumberCounter
            from={0}
            to={content?.home_section2_1.count}
            unit={content?.home_section2_1.unit}
            title={content?.home_section2_1.title}
          />
          <NumberCounter
            from={0}
            to={content?.home_section2_2.count}
            unit={content?.home_section2_2.unit}
            title={content?.home_section2_2.title}
          />
          <NumberCounter
            from={0}
            to={content?.home_section2_3.count}
            unit={content?.home_section2_3.unit}
            title={content?.home_section2_3.title}
          />
        </div>
      </section>

      <section className={styles.thirdSection}>
        <FadeUpEffect tag="h2">
          {content?.home_section3_title.text}
        </FadeUpEffect>
        <div>
          {isMobileDisplay ? (
            <Swiper
              modules={[Autoplay]}
              spaceBetween={20}
              slidesPerView={"auto"}
              autoplay
            >
              {newLogos.map((logo, index) => (
                <SwiperSlide key={index} style={{ width: "50%" }}>
                  <div>
                    <img
                      src={logo}
                      alt={`Logo ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "150px",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            Array.from({ length: Math.ceil(newLogos.length / 5) }).map(
              (_, slideIndex) => (
                <div key={slideIndex}>
                  <FadeUpEffect
                    tag="div"
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      gap: "3%",
                      marginBottom: "25px",
                    }}
                  >
                    {Array.from({ length: 5 }).map((_, imageIndex) => {
                      const image = newLogos[slideIndex * 5 + imageIndex];
                      return image ? (
                        <img
                          key={imageIndex}
                          src={image}
                          alt={`Logo ${slideIndex * 5 + imageIndex + 1}`}
                          loading="lazy"
                          style={{
                            boxSizing: "border-box",
                            padding: "2%",
                            width: "18%",
                            height: "150px",
                            objectFit: "contain",
                          }}
                        />
                      ) : (
                        <div key={imageIndex} style={{ width: "18%" }} />
                      );
                    })}
                  </FadeUpEffect>
                </div>
              )
            )
          )}
        </div>
      </section>

      <ContactSection
        title={content?.home_section4_title.text}
        underlinedTitle={content?.home_section4_subtitle.text}
        desc={content?.home_section4_subtitle2.text}
        url={content?.home_section4_video.text}
        isVideoBackground={true}
        onClick={() => window.open("/contact", "_self")}
      />
      <br />
      <br />
      <br />

      <section className={styles.sixthSection}>
        <TitleAndSeparator title={content?.home_section5_title.text} />
        <br />
        <br />
        <br />
        <br />
        <div>
          {(content?.pageSuccessStories || []).map((item, index) => (
            <div key={index}>
              <ProductCard
                subTitle={item.subTitle}
                title={item.title}
                description={item.description}
                image={item.mainImageUrl}
                link={""}
                isMobile={isMobileDisplay}
              />
              <div
                style={{
                  height:
                    index !== (content?.pageSuccessStories || []).length - 1
                      ? "4rem"
                      : 0,
                }}
              ></div>
            </div>
          ))}
        </div>
      </section>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <EndSection
        titleIntro={content?.home_section6_title.text}
        title={content?.home_section6_subtitle.text}
        underlinedTitle={content?.home_section6_subtitle2.text}
        content={content?.home_section6_subtitle3.text}
        background={content?.home_section6_image.text}
        isBackgroundImg={true}
        onClick={() => window.open("/contact", "_self")}
        style={1}
      />
    </>
  );
}

export default HomePage;
