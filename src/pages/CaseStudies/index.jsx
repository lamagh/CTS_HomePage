import { useEffect, useState } from 'react';
import HeroSection from '../../components/HeroSection';
import styles from './caseStudies.module.css';
import useLoadingData from '../../hooks/useLoadingData';
import LoadingScreen from '../../components/LoadingScreen';
import RichTextEditor from '../../components/RichTextEditor';

function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData('media');
  const [isInfoLoading, setIsInfoLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchInfo = async () => {
    try {
      setIsInfoLoading(true);
      const url = `${API_BASE_URL}/CaseStudies`;

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setCaseStudies(data);
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
        isDarkMode={false}
        image={content?.media_section2_image3.text}
        onClick={() => console.log('Demo clicked')}
        bool={false}
      />
      <section className={styles.caseStudiesSection}>
        <div className={styles.caseStudiesContainer}>
          {caseStudies.map((caseStudy, index) => (
            <article key={index} className={styles.caseStudy}>
              <div className={styles.caseStudyHeader}>
                <h2>
                  Case Study <span>{index + 1}</span>
                </h2>
              </div>

              <div className={styles.caseStudyContent}>
                <RichTextEditor
                  initialContent={JSON.parse(caseStudy.body)}
                  readonly={true}
                />
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default CaseStudies;
