import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { logoInitials } from '../../constants/assets';
import styles from './floatingFooter.module.css';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function FloatingFooter() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [prevScroll, setPrevScroll] = useState(0);

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-4rem' },
  };

  function update(latest, prev) {
    if (latest < prev) {
      setHidden(false);
    } else if (latest > 100 && latest > prev) {
      setHidden(true);
    }
  }

  useMotionValueEvent(scrollY, 'change', (latest) => {
    update(latest, prevScroll);
    setPrevScroll(latest);
  });

  return (
    <motion.div
      variants={variants}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{
        ease: [0.1, 0.25, 0.3, 1],
        duration: 0.5,
      }}
      className={styles.container}
    >
      <NavLink to='/'>
        <img src={logoInitials} alt='cts logo' />
      </NavLink>
      <ul className={styles.linksCont}>
        <li>
          <NavLink
            to='/about'
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/products'
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/media'
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Media
          </NavLink>
        </li>
        <li>
          <NavLink
            to='/contact'
            className={({ isActive }) => (isActive ? styles.activeLink : '')}
          >
            Contact
          </NavLink>
        </li>
      </ul>
    </motion.div>
  );
}

export default FloatingFooter;
