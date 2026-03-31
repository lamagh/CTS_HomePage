import HeroSection from '../../components/HeroSection';
import CustomSwiper from '../../components/CustomSwiper';
import styles from './blogs.module.css';
import { useEffect, useState } from 'react';
import LoadingScreen from '../../components/LoadingScreen';
import dayjs from 'dayjs';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [isMediaLoading, setIsMediaLoading] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const fetchInfo = async () => {
    try {
      setIsMediaLoading(true);
      const url = `${API_BASE_URL}/Blogs?t=100&p=1&isRecent=true`;

      const res = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setBlogs(data);
      setIsMediaLoading(false);
    } catch (error) {
      setIsMediaLoading(true);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      {isMediaLoading && <LoadingScreen />}
      <div style={{ height: '5rem' }}></div>
      {blogs.map((section, index) => (
        <section className={styles.secondSection} key={index}>
          <div className={styles.title}>
            <p>
              {section.title} <span>{dayjs(section.createdAt).year()}</span>
            </p>
          </div>
          <div>
            <CustomSwiper
              slides={section.blogImages.map((item) => ({
                img: item.imageUrl,
              }))}
            />
          </div>
          {index != blogs.length && <hr className={styles.titleUnderline} />}
        </section>
      ))}
    </>
  );
}

export default Blogs;
