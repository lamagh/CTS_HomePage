import FadeUpEffect from "../FadeUpEffect";
import Button from "../Button";
import { smallRightArrow } from "../../constants/assets";
import styles from "./productSummaryCard.module.css";
import { useState } from "react";
import Popup from "../Popup/index";

function ProductSummaryCard({ href, logo, title, desc, detailedDescription }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <Popup onClick={() => setOpen(false)}>
          <div className={styles.popContent}>
            <h2>{title}</h2>
            <p>{detailedDescription}</p>
            <Button
              onClick={() => window.open(href, "_top")}
              id={1}
              img={smallRightArrow}
            >
              Learn more
            </Button>
          </div>
        </Popup>
      )}
      <FadeUpEffect tag="div" className={styles.card}>
        <div>
          <img src={logo} alt="product-logo" />
          <p>{desc}</p>
        </div>
        <Button id={3} img={smallRightArrow} onClick={() => setOpen(true)}>
          Learn more
        </Button>
      </FadeUpEffect>
    </>
  );
}

export default ProductSummaryCard;
