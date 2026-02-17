import styles from "./dashboardNav.module.css";
import {
  mainLogo,
  windowSidebar,
  arrow,
  homeIcon,
  servicesIcon,
  productIcon,
  blogIcon,
  usersIcon,
  settingsIcon,
  userIcon,
  logoutIcon,
} from "../../constants/assets";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import useSignOut from "react-auth-kit/hooks/useSignOut";

function DashboardNav({ children }) {
  const signOut = useSignOut();
  const authData = useAuthUser();
  const router = useNavigate();
  const [isNavbarReduced, setNavbarReduced] = useState(false);

  const handleSidebarBtn = () => {
    setNavbarReduced(!isNavbarReduced);
  };

  const upperLinks = [
    { img: homeIcon, name: "Pages", link: "/dashboard" },
    // {
    //   img: servicesIcon,
    //   name: "Services",
    //   link: "/dashboard/services",
    // },
    // {
    //   img: productIcon,
    //   name: "Products",
    //   link: "/dashboard/products",
    // },
    // {
    //   img: blogIcon,
    //   name: "Blogs",
    //   link: "/dashboard/blogs",
    // },
    // {
    //   img: blogIcon,
    //   name: "Case Studies",
    //   link: "/dashboard/case-studies",
    // },
    // {
    //   img: blogIcon,
    //   name: "Testimonials",
    //   link: "/dashboard/testimonials",
    // },
    // {
    //   img: blogIcon,
    //   name: "News",
    //   link: "/dashboard/news",
    // },
    // {
    //   img: blogIcon,
    //   name: "Success Stories",
    //   link: "/dashboard/success-stories",
    // },
    {
      img: usersIcon,
      name: "Team Members",
      link: "/dashboard/team-members",
    },
    {
      img: usersIcon,
      name: "Users",
      link: "/dashboard/users",
    },
  ];

  const user = {
    img: userIcon,
    name: authData.userName,
    email: authData.email,
  };

  return (
    <div className={styles.dashboardBody}>
      <nav
        className={`${styles.navbar} ${isNavbarReduced ? styles.reduced : ""}`}
      >
        <div className={styles.upperSection}>
          <div
            className={`${styles.navHeader} ${
              isNavbarReduced ? styles.reduced : ""
            }`}
          >
            <img src={mainLogo} alt="cts-logo" />
            <button
              className={`${styles.windowBtn} ${
                isNavbarReduced ? styles.reduced : ""
              }`}
              onClick={handleSidebarBtn}
            >
              <img
                src={windowSidebar}
                alt="window-sidebar"
                height="30px"
                width="30px"
              />
            </button>
          </div>
          <ul
            className={`${styles.navLinks} ${
              isNavbarReduced ? styles.reduced : ""
            }`}
          >
            {upperLinks.map((e, i) => (
              <li key={i}>
                <NavLink
                  to={e.link}
                  end
                  className={({ isActive }) =>
                    isActive ? styles.active : null
                  }
                >
                  <img src={e.img} alt={e.name + "-icon"} />
                  <p>{e.name}</p>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`${styles.userBox} ${
            isNavbarReduced ? styles.reduced : ""
          }`}
        >
          <Accordion>
            <AccordionSummary
              sx={{
                padding: "0px 10px",
              }}
              expandIcon={
                <img
                  className={`${styles.userArrow}  ${
                    isNavbarReduced ? styles.reduced : ""
                  }`}
                  src={arrow}
                  alt="arrow-icon"
                />
              }
            >
              <div className={styles.userInfo}>
                <img
                  className={styles.userProfile}
                  src={user.img}
                  alt={user.name + "-icon"}
                />
                <div>
                  <p className={styles.userName}>{user.name}</p>
                  <p className={styles.userEmail}>{user.email}</p>
                </div>
              </div>
            </AccordionSummary>
            <AccordionDetails className={styles.userBoxDetails}>
              <ul
                className={`${styles.userLinks} ${
                  isNavbarReduced ? styles.reduced : ""
                }`}
              >
                <li
                  onClick={() => {
                    signOut();
                    router(`/`);
                  }}
                >
                  <img src={logoutIcon} alt={"Log out icon"} />
                  <p>Log out</p>
                </li>
              </ul>
            </AccordionDetails>
          </Accordion>
        </div>
      </nav>
      {children}
    </div>
  );
}

export default DashboardNav;
