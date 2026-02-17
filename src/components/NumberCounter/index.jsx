import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import styles from "./numberCounter.module.css";

function NumberCounter({ from, to, unit, title }) {
  const nodeRef = useRef();
  let isInView = useInView(nodeRef, { once: true });

  useEffect(() => {
    const node = nodeRef.current;

    if (isInView) {
      const controls = animate(from, to, {
        duration: 2,

        onUpdate(value) {
          node.textContent = `${value.toFixed(0)}${unit ? unit : ""}+`;
        },
      });

      return () => controls.stop();
    }
  }, [from, to, isInView]);

  return (
    <div className={styles.container}>
      <p className={styles.kpiMetric} ref={nodeRef}></p>
      <p className={styles.kpiTitle}>{title}</p>
    </div>
  );
}

export default NumberCounter;
