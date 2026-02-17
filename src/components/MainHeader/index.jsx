import { NavLink } from "react-router-dom";
import { mainLogo, mainLogoBlack } from "../../constants/assets";
import styles from "./mainHeader.module.css";

function MainHeader() {
  return (
    <header className={styles.container}>
      <NavLink to="/">
        <img src={mainLogoBlack} alt="cts-logo" width={190} height="auto" />
      </NavLink>
      <nav>
        <ul className={styles.linksCont}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              About us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/products"
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/media"
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              Media
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? styles.active : null)}
            >
              Contact us
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
