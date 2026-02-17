import HeroSection from "../../components/HeroSection";
import styles from "./news.module.css";
import { Helmet } from "react-helmet-async";
import CustomSwiper from "../../components/CustomSwiper";
import LoadingScreen from "../../components/LoadingScreen";
import { useEffect, useState } from "react";

function NewsPage() {
  const [news, setNews] = useState([]);
  const [isMediaLoading, setIsMediaLoading] = useState(false);

  const fetchInfo = async () => {
    try {
      const url = `/api/News`;

      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setNews(data);
    } catch (error) {
      setIsMediaLoading(true);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <Helmet>
        <title>News</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <br />
      <br />
      <section className={styles.secondSection}>
        <CustomSwiper
          slides={news.map((news) => ({
            img: news.imageUrl,
          }))}
          backgroundColor="#051d2e"
          pagination={false}
        />
      </section>
    </>
  );
}

export default NewsPage;
