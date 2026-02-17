import { motion } from "framer-motion";

function FadeUpEffect({ tag, offset = 90, className, style, children }) {
  const ElementTag =
    tag == "p"
      ? motion.p
      : tag == "div"
      ? motion.div
      : tag == "h2"
      ? motion.h2
      : tag == "h1"
      ? motion.h1
      : tag == "li"
      ? motion.li
      : tag == "button"
      ? motion.button
      : motion.p;

  return (
    <ElementTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        visible: { opacity: 1, y: 0 },
        hidden: { opacity: 0, y: offset },
      }}
      transition={{ ease: "easeOut", duration: 0.8, delay: 0.15 }}
      className={className}
      style={style}
    >
      {children}
    </ElementTag>
  );
}

export default FadeUpEffect;
