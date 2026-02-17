import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import styles from "./testimonials.module.css";
import LoadingScreen from "../../components/LoadingScreen";
import dayjs from "dayjs";
import useLoadingData from "../../hooks/useLoadingData";

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData("media");
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      setIsInfoLoading(true);
      const url = `/api/Testimonials`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setTestimonials(data);
      setIsInfoLoading(false);
    } catch (error) {
      setIsInfoLoading(true);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      {(isMediaLoading || isInfoLoading) && <LoadingScreen />}
      <HeroSection
        prefix={""}
        headline={""}
        description={""}
        isDarkMode={true}
        image={content?.media_section2_image4.text}
        onClick={() => console.log("Demo clicked")}
        bool={false}
      />
      <section className={styles.testimonialsSection}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonial}>
            <h3>
              Testimonial <span>{index + 1}</span>
            </h3>
            <p className={styles.quote}>
              "{testimonial.body}",{" "}
              {dayjs(testimonial.date).format("DD MM YYYY")}
            </p>
            <div className={styles.author}>
              <p className={styles.name}>{testimonial.fullName}</p>
              {testimonial.position && (
                <p className={styles.position}>{testimonial.position}</p>
              )}
              {testimonial.company && (
                <p className={styles.company}>{testimonial.company}</p>
              )}
            </div>
            <hr className={styles.titleUnderline} />
          </div>
        ))}
      </section>
    </>
  );
}

export default Testimonials;
