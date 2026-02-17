import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import { arrow } from "../../constants/assets";
import styles from "./caseStudyCard.module.css";

function CaseStudyCard({ img, title, desc }) {
  return (
    <div className={styles.card}>
      <img src={img} alt="card-img" />
      <p className={styles.cardTitle}>{title}</p>
      <Accordion
        className={styles.accordion}
        sx={{
          boxShadow: "none",
          display: "flex",
          flexDirection: "column-reverse",
        }}
      >
        <AccordionSummary
          className={styles.accordionSummary}
          expandIcon={
            <img className={styles.arrow} src={arrow} alt="arrow-icon" />
          }
          sx={{
            padding: "0",
          }}
        >
          <div className={styles.cardFooter}>
            <p>Read more</p>
          </div>
        </AccordionSummary>
        <AccordionDetails
          className={styles.cardDesc}
          sx={{
            marginTop: "22px",
            padding: "0",
          }}
        >
          {desc}
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default CaseStudyCard;
