import styles from "./publishSection.module.css";
import { CircularProgress } from "@mui/material";
import dayjs from "dayjs";
import { globeIcon, previewIcon } from "../../constants/assets";

const PublishSection = ({ isEditMode, loading, data, handleSave }) => {
  return (
    <div className={styles.secondColHeader}>
      <div className={styles.secondColContent}>
        <button
          className={styles.publishBtn}
          // onClick={handleSave}
          disabled={loading}
          type="submit"
        >
          {!loading && (
            <img src={globeIcon} width={20} height={20} alt="Publish" />
          )}
          {loading && (
            <CircularProgress size={20} className={styles.progress} />
          )}
          Publish
        </button>
        {isEditMode && (
          <div className={styles.creationContent}>
            {data.createdAt && (
              <>
                <p>Created:</p>
                <span>
                  {dayjs(data.createdAt).format("DD/MM/YYYY hh:mm a")}
                </span>
              </>
            )}
            {data.lastUpdatedAt && (
              <>
                <p>Last Modified:</p>
                <span>
                  {dayjs(data.lastUpdatedAt).format("DD/MM/YYYY hh:mm a")}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PublishSection;
