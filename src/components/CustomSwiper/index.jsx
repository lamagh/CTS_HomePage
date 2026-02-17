import { useId, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import ArrowIcon from "../ArrowIcon";
import styles from "./customSwiper.module.css";
import useDisplay from "../../hooks/useDisplay";

const CustomSwiper = ({ slides, backgroundColor, pagination = true }) => {
  const [isMobileDisplay] = useDisplay();
  const uniqueId = useId().replace(/:/g, "");

  const leftArrowClass = `swiper-arrow-left-${uniqueId}`;
  const rightArrowClass = `swiper-arrow-right-${uniqueId}`;

  return (
    <div
      className={
        isMobileDisplay
          ? `${styles.swiperContainerMobile}`
          : `${styles.swiperContainer}`
      }
    >
      {!isMobileDisplay && (
        <div className={`${styles.swiperArrowLeft} ${leftArrowClass}`}>
          <ArrowIcon direction="left" color="black" />
        </div>
      )}

      <Swiper
        className={styles.swiper}
        style={{ backgroundColor: backgroundColor || "transparent" }}
        centeredSlides={isMobileDisplay}
        slidesPerView={1}
        loop={true}
        spaceBetween={isMobileDisplay ? 20 : 10}
        navigation={{
          nextEl: `.${rightArrowClass}`,
          prevEl: `.${leftArrowClass}`,
        }}
        pagination={pagination ? { clickable: true } : false}
        modules={[Navigation, Pagination]}
      >
        {slides.map((slide, index) => (
          <SwiperSlide className={styles.swiperSlide} key={index}>
            <img src={slide.img} alt={`slide-${index}`} draggable={false} />
          </SwiperSlide>
        ))}
      </Swiper>

      {!isMobileDisplay && (
        <div className={`${styles.swiperArrowRight} ${rightArrowClass}`}>
          <ArrowIcon direction="right" color="black" />
        </div>
      )}

      {isMobileDisplay && (
        <div
          style={{
            marginTop: "1.5rem",
            display: "flex",
            gap: "5%",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <div className={`${styles.swiperArrowLeft} ${leftArrowClass}`}>
            <ArrowIcon direction="left" color="black" />
          </div>
          <div className={`${styles.swiperArrowRight} ${rightArrowClass}`}>
            <ArrowIcon direction="right" color="black" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSwiper;
