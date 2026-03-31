import FadeUpEffect from '../../components/FadeUpEffect';
import ProductSummaryCard from '../../components/ProductSummaryCard/index.jsx';
import ServiceCard from '../../components/ServiceCard/index.jsx';
import HomeHeroSection from '../../components/HomeHeroSection/index.jsx';
import {
  aiducatorLogo,
  area9Logo,
  bilarabiLogo,
  curvedSmallArrow,
  canvasLogo,
  edulyticsLogo,
  microsoftLogo,
  netsupportLogo,
  vitalsourceLogo,
  wizefloorLogo,
  serviceOne,
  serviceTwo,
  serviceThree,
  oneIdentityLogo,
} from '../../constants/assets.js';
import styles from './products.module.css';
import 'swiper/css';
import { Helmet } from 'react-helmet-async';
import useLoadingData from '../../hooks/useLoadingData.js';
import LoadingScreen from '../../components/LoadingScreen/index.jsx';
import { lazy, useMemo } from 'react';

const EndSection = lazy(() => import('../../components/EndSection'));
const TitleAndSeparator = lazy(
  () => import('../../components/TitleAndSeparator'),
);

function ProductsPage() {
  const [content, isMediaLoading, setIsMediaLoading] =
    useLoadingData('products');

  const handleLink = (slug) => {
    if (slug == 'aiducator') {
      return '/products/aiducator';
    } else if (slug == 'bilarabi') {
      return 'https://www.myarabic.ae/bilarabi/ar/';
    }

    return '/contact';
  };

  const higherProducts = useMemo(
    () =>
      (content?.pageProducts || []).filter((e) =>
        e.category.includes('Higher Education'),
      ),
    [content?.pageProducts],
  );

  const lowerProducts = useMemo(
    () =>
      (content?.pageProducts || []).filter((e) => e.category.includes('K-12')),
    [content?.pageProducts],
  );

  return (
    <>
      <Helmet>
        <title>Products</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <HomeHeroSection
        subtitle={content?.products_section1_title.text}
        title={content?.products_section1_subtitle.text}
        desc={content?.products_section1_body.text}
        videoBg={content?.products_section1_video.text}
        mobileBg={content?.products_section1_video.text}
        setIsMediaLoading={setIsMediaLoading}
      />

      <section className={styles.secondSection}>
        <TitleAndSeparator title={content?.products_section2_title.text} />
        <FadeUpEffect tag='p'>
          {content?.products_section2_subtitle.text}
        </FadeUpEffect>
        <div className={styles.productCards}>
          {higherProducts.map((e, i) => (
            <ProductSummaryCard
              key={i}
              href={handleLink(e.slug)}
              logo={e.logoUrl}
              title={e.title}
              desc={e.shortDescription}
              detailedDescription={e.description}
            />
          ))}
        </div>
      </section>

      <section className={styles.thirdSection}>
        <TitleAndSeparator title={content?.products_section2_title2.text} />
        <FadeUpEffect tag='p'>
          {content?.products_section2_subtitle2.text}
        </FadeUpEffect>
        <div className={styles.productCards}>
          {lowerProducts.map((e, i) => (
            <ProductSummaryCard
              key={i}
              href={handleLink(e.slug)}
              logo={e.logoUrl}
              title={e.title}
              desc={e.shortDescription}
              detailedDescription={e.description}
            />
          ))}
        </div>
      </section>

      <section className={styles.fourthSection}>
        <p className={styles.fourthSecSubTitle}>
          {content?.products_section3_title.text}
          <img src={curvedSmallArrow} alt='curved down arrow' />
        </p>
        <FadeUpEffect tag='h2' className={styles.fourthSecTitle}>
          {content?.products_section3_subtitle.text}
        </FadeUpEffect>
        <div className={styles.servicesContainer}>
          {(content?.pageServices || []).map((e, i) => (
            <ServiceCard
              key={i}
              img={e.mainImageUrl}
              title={e.title}
              description={e.description}
              link={''}
            />
          ))}
        </div>
      </section>

      <EndSection
        titleIntro={content?.products_section4_title.text}
        title={content?.products_section4_subtitle.text}
        underlinedTitle={content?.products_section4_subtitle2.text}
        content={content?.products_section4_subtitle3.text}
        background={content?.products_section4_image.text}
        isBackgroundImg={true}
        style={1}
      />
    </>
  );
}

export default ProductsPage;
