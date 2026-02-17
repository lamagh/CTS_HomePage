import styles from "./body.module.css";
import { webIcon } from "../../constants/assets";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

function DashboardBody({ children }) {
  const authData = useAuthUser();
  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Hello, {authData.userName} 👋</h1>
        <a className={styles.siteLink} href="/" target="_blank">
          <img src={webIcon} alt="web-icon" />
          <p>Open Site</p>
        </a>
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}

export default DashboardBody;
