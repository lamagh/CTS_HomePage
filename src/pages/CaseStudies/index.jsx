import { useEffect, useState } from "react";
import HeroSection from "../../components/HeroSection";
import styles from "./caseStudies.module.css";
import useLoadingData from "../../hooks/useLoadingData";
import LoadingScreen from "../../components/LoadingScreen";
import RichTextEditor from "../../components/RichTextEditor";

function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [content, isMediaLoading, setIsMediaLoading] = useLoadingData("media");
  const [isInfoLoading, setIsInfoLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      setIsInfoLoading(true);
      const url = `/api/CaseStudies`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
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
        prefix={""}
        headline={""}
        description={""}
        isDarkMode={false}
        image={content?.media_section2_image3.text}
        onClick={() => console.log("Demo clicked")}
        bool={false}
      />
      <section className={styles.caseStudiesSection}>
        {...caseStudies.map((caseStudy, index) => (
          <>
            <div className={styles.caseStudy}>
              <h2>Case Study {index + 1}:</h2>
              <RichTextEditor
                initialContent={JSON.parse(caseStudy.body)}
                readonly={true}
              />
            </div>
            <br />
            <br />
          </>
        ))}
      </section>
    </>
  );
}

export default CaseStudies;
