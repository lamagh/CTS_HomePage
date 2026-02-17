import styles from "./button.module.css";
import { CircularProgress } from "@mui/material";

function Button({
  children,
  href,
  id,
  onClick,
  img = null,
  defaultMargin = true,
  disabled = false,
}) {
  const stylesList = [styles.style1, styles.style2, styles.style3];

  return (
    <button
      className={`${styles.btn} ${stylesList[id - 1]} ${
        disabled ? styles.disabled : ""
      }`}
      style={{ marginTop: defaultMargin ? "32px" : "0" }}
      onClick={onClick}
      disabled={disabled}
    >
      <p>{children}</p>
      {disabled ? (
        <CircularProgress size={20} color="inherit" />
      ) : (
        img && <img src={img} alt="btn-icon" />
      )}
    </button>
  );
}

export default Button;
