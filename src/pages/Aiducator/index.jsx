import FadeUpEffect from "../../components/FadeUpEffect";
import HeroSection from "../../components/HeroSection";
import Button from "../../components/Button";
import { smallRightArrow } from "../../constants/assets";
import styles from "./aiducator.module.css";
import useLoadingData from "../../hooks/useLoadingData";
import { lazy, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
} from "@mui/material";
import useDisplay from "../../hooks/useDisplay";
import { Helmet } from "react-helmet-async";
import AddIcon from "@mui/icons-material/Add";
import VideoPlayer from "../../components/VideoPlayer";
import LoadingScreen from "../../components/LoadingScreen";

const EndSection = lazy(() => import("../../components/EndSection"));
const ContactSection = lazy(() => import("../../components/ContactSection"));

function Aiducator() {
  const [isMobileDisplay] = useDisplay();
  const [isOpen, setIsOpen] = useState(false);
  const [content, isMediaLoading] = useLoadingData("aiducator");

  const attributes = [
    {
      icon: "/assets/aiducatorIcons/1.jpg",
      title: "Effortless Information Access",
      body: "AiDucator turns complex searches into simple conversations. Students and parents get instant answers to their questions, without the frustration of navigating through endless pages.",
    },
    {
      icon: "/assets/aiducatorIcons/2.jpg",
      title: "Lighten Administrative Load",
      body: "Let AiDucator handle the routine queries, so your staff can focus on what truly matters—providing personalized support and tackling the bigger challenges.",
    },
    {
      icon: "/assets/aiducatorIcons/3.jpg",
      title: "24/7 Availability",
      body: "AiDucator never sleeps. It’s always there, ready to assist students and parents anytime, ensuring they feel supported around the clock.",
    },
    {
      icon: "/assets/aiducatorIcons/4.jpg",
      title: "Personalized Assistance",
      body: "Every interaction is tailored. AiDucator understands individual needs and delivers the right information, right when it’s needed, making every query feel personal and relevant.",
    },
    {
      icon: "/assets/aiducatorIcons/5.jpg",
      title: "Data-Driven Insights",
      body: "With AiDucator, every conversation is an opportunity to learn. Gain valuable insights from user interactions to continuously improve your institution’s services and better meet the needs of your community.",
    },
  ];

  const features = [
    {
      title: "Natural Language Processing",
      body: "AiDucator understands and interprets conversational language, enabling smooth, human-like interactions that make finding information effortless.",
    },
    {
      title: "Multilingual Support",
      body: "Communicate seamlessly in any language. AiDucator provides real-time responses, ensuring every query is understood and addressed, no matter the language barrier.",
    },
    {
      title: "CRM Integration and Lead Generation",
      body: "Effortlessly connect AiDucator with your CRM system to streamline lead management and capture valuable prospects with ease.",
    },
    {
      title: "Dashboard Insights and Analytics",
      body: "Gain deep insights into user interactions and performance metrics with our comprehensive analytics dashboard, empowering your institution to make data-driven decisions.",
    },
    {
      title: "Scheduling Meetings and Tours",
      body: "Simplify the booking process for meetings and tours. AiDucator uses natural language prompts to make scheduling quick and intuitive.",
    },
    {
      title: "Voice Interaction",
      body: "Enhance the user experience with integrated voice capabilities, allowing students and parents to engage with AiDucator in a more dynamic and accessible way.",
    },
    {
      title: "Fully Customizable",
      body: "Tailor AiDucator to fit your institution’s unique needs and branding, ensuring a seamless integration with your existing systems and identity.",
    },
    {
      title: "Extensive Knowledge Base",
      body: "Leverage a chatbot trained on your institution’s specific data, providing accurate and comprehensive information at all times.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>AIducator</title>
      </Helmet>
      {isMediaLoading && <LoadingScreen />}
      <HeroSection
        title={content?.aiducator_section1_subtitle.text}
        subTitle={content?.aiducator_section1_title.text}
        description={content?.aiducator_section1_body.text}
        isDarkMode={true}
        image={content?.aiducator_section1_image.text}
        onClick={() => window.open("/contact", "_self")}
      />
      <section className={styles.secondSection}>
        <FadeUpEffect tag="h2">
          {content?.aiducator_section2_title.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.aiducator_section2_body1.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.aiducator_section2_body2.text}
        </FadeUpEffect>
        <Button
          onClick={() => window.open("/contact", "_self")}
          id={3}
          img={smallRightArrow}
        >
          Book a demo
        </Button>
      </section>
      <section className={styles.thirdSection}>
        {/* <img
          src={content?.aiducator_section2_image.text}
          alt=""
          style={{ height: "20%", width: "100%" }}
        /> */}
        <VideoPlayer
          url={content?.aiducator_section2_image.text}
          title={""}
          desc={""}
        />
        <FadeUpEffect tag="h2">
          {content?.aiducator_section3_title.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.aiducator_section3_body1.text}
        </FadeUpEffect>
        <FadeUpEffect tag="p">
          {content?.aiducator_section3_body2.text}
        </FadeUpEffect>
        <Button
          onClick={() => window.open("/contact", "_self")}
          id={3}
          img={smallRightArrow}
        >
          Book a Demo
        </Button>
      </section>
      <section className={styles.fourthSection}>
        <FadeUpEffect tag="h2">
          {content?.aiducator_section4_title.text}
        </FadeUpEffect>
        <ul>
          <SingleAttribute
            title={content?.aiducator_section4_attitle1.text}
            subTitle={content?.aiducator_section4_atsubtitle1.text}
            icon={attributes[0].icon}
          />
          <SingleAttribute
            title={content?.aiducator_section4_attitle2.text}
            subTitle={content?.aiducator_section4_atsubtitle2.text}
            icon={attributes[1].icon}
          />
          <SingleAttribute
            title={content?.aiducator_section4_attitle3.text}
            subTitle={content?.aiducator_section4_atsubtitle3.text}
            icon={attributes[2].icon}
          />
          <SingleAttribute
            title={content?.aiducator_section4_attitle4.text}
            subTitle={content?.aiducator_section4_atsubtitle4.text}
            icon={attributes[3].icon}
          />
          <SingleAttribute
            title={content?.aiducator_section4_attitle5.text}
            subTitle={content?.aiducator_section4_atsubtitle5.text}
            icon={attributes[4].icon}
          />
        </ul>
      </section>
      <ContactSection
        title={content?.aiducator_section5_title.text}
        underlinedTitle={content?.aiducator_section5_subtitle.text}
        desc={content?.aiducator_section5_body.text}
        isVideoBackground={false}
        url={content?.aiducator_section5_image.text}
        onClick={() => window.open("/contact", "_self")}
      />

      <section className={styles.sixthSection}>
        <FadeUpEffect tag="h2">
          {content?.aiducator_section6_title.text}
        </FadeUpEffect>

        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle2.text}
          body={content?.aiducator_section6_optitle3.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle4.text}
          body={content?.aiducator_section6_optitle5.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle6.text}
          body={content?.aiducator_section6_optitle7.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle8.text}
          body={content?.aiducator_section6_optitle9.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle10.text}
          body={content?.aiducator_section6_optitle11.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle12.text}
          body={content?.aiducator_section6_optitle13.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle14.text}
          body={content?.aiducator_section6_optitle15.text}
        />
        <SingleFeatureAccordion
          title={content?.aiducator_section6_optitle16.text}
          body={content?.aiducator_section6_optitle17.text}
        />
      </section>

      <EndSection
        titleIntro={content?.aiducator_section7_title.text}
        title={content?.aiducator_section7_subtitle.text}
        underlinedTitle={content?.aiducator_section7_subtitle2.text}
        content={null}
        background={content?.aiducator_section7_image.text}
        isBackgroundImg={true}
        style={isMobileDisplay ? 1 : 0}
        onClick={() => window.open("/contact", "_self")}
      />
    </>
  );
}

export default Aiducator;

function SingleFeatureAccordion({ title, body }) {
  return (
    <Accordion
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid #000000",
        padding: "8px 16px",
        "&:before": { display: "none" },
        "&.Mui-expanded": {
          margin: 0,
        },
      }}
    >
      <AccordionSummary
        expandIcon={<AddIcon sx={{ color: "black" }} />}
        sx={{
          "& .MuiAccordionSummary-content": {
            margin: 0,
          },
          "&.Mui-expanded .MuiAccordionSummary-content": {
            margin: 0,
          },
          minHeight: "55px",
          "&.Mui-expanded": { minHeight: "55px" },
        }}
      >
        <p className={styles.accordionTitle}>{title}</p>
      </AccordionSummary>
      <AccordionDetails>
        <p className={styles.accordionBody}>{body}</p>
      </AccordionDetails>
    </Accordion>
  );
}

function SingleAttribute({ title, subTitle, icon }) {
  return (
    <FadeUpEffect tag="li">
      <p className={styles.title}>
        <img src={icon} alt="icon" width={26} height={26} /> {title}
      </p>
      <p className={styles.body}>{subTitle}</p>
    </FadeUpEffect>
  );
}
