import { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import styles from './testimonials.module.css';
import LoadingScreen from '../../components/LoadingScreen';
import dayjs from 'dayjs';
import useLoadingData from '../../hooks/useLoadingData';

function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData('media');
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchInfo = async () => {
    try {
      setIsInfoLoading(true);
      const url = `${API_BASE_URL}/Testimonials`;

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
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
        prefix={''}
        headline={''}
        description={''}
        isDarkMode={true}
        image={content?.media_section2_image4.text}
        onClick={() => console.log('Demo clicked')}
        bool={false}
      />
      <section className={styles.testimonialsSection}>
        <div className={styles.testimonialsContainer}>
          {testimonials.map((testimonial, index) => (
            <article key={index} className={styles.testimonial}>
              <div className={styles.testimonialHeader}>
                <h3>
                  Testimonial <span>{index + 1}</span>
                </h3>
              </div>

              <p className={styles.quote}>"{testimonial.body}"</p>

              <div className={styles.author}>
                <p className={styles.name}>{testimonial.fullName}</p>

                {(testimonial.position || testimonial.company) && (
                  <p className={styles.meta}>
                    {testimonial.position}
                    {testimonial.position && testimonial.company ? ' • ' : ''}
                    {testimonial.company}
                  </p>
                )}

                <p className={styles.date}>
                  {dayjs(testimonial.date).format('DD MM YYYY')}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default Testimonials;
