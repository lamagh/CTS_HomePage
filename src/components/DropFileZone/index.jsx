import styles from "./dropFileZone.module.css";
import { uploadIcon } from "../../constants/assets";
import { useState } from "react";
import { contentType } from "../../constants/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useAlertSnackBar } from "../../hooks/useAlertSnackbar";
import { CircularProgress } from "@mui/material";

function DropFileZone({ onChange, editMode, url, type, index, name, size }) {
  const authHeader = useAuthHeader();
  const showAlertSnackBar = useAlertSnackBar();
  const [isDragEnter, setIsDragEnter] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDrag = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragEnter(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragEnter(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragEnter(false);
    handleFileUpload(event.dataTransfer.files[0]);
  };

  const handleFileUpload = async (file) => {
    if (isLoading || !file?.type?.startsWith(type)) {
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = `/api/AzureBlob`;

      const res = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: authHeader,
        },
        body: formData,
      });

      if (!res.ok) {
        throw Error();
      }

      const imageUrl = await res.text();

      setIsLoading(false);
      onChange(index, type, {
        target: { name: name, value: imageUrl },
      });
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      await showAlertSnackBar({
        title: "Error while uploading image, try again later.",
        severity: "error",
      });
    }
  };

  return (
    <div
      className={`${styles.videoContentContainer} ${
        editMode ? styles.editModeContainer : ""
      } ${isDragEnter ? styles.isDragActive : ""} ${
        !(url && url.length > 0) ? styles.noDefaultImage : ""
      }`}
      onDrop={handleDrop}
      onDragOver={handleDrag}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {url && url.length > 0 ? (
        type == contentType.video ? (
          <video
            controls={editMode}
            muted={!editMode}
            key={url}
            playsInline
            draggable={false}
          >
            <source src={url} type="video/mp4" />
          </video>
        ) : (
          <img src={url} alt="image preview" draggable={false} />
        )
      ) : (
        <></>
      )}
      {editMode && (
        <>
          {url && url.length > 0 && <div className={styles.divider}></div>}
          <label
            htmlFor={`file-input-${index}`}
            className={styles.uploadContainer}
          >
            {isLoading ? (
              <CircularProgress size={30} style={{ color: "royalblue" }} />
            ) : (
              <>
                {" "}
                <img src={uploadIcon} height={36} width={36} />
                <p>
                  Drag & drop to upload
                  <br />
                  or <span>click here</span>
                  <br />
                  <p>({size || "16:9"})</p>
                </p>
              </>
            )}
          </label>
          <input
            type="file"
            id={`file-input-${index}`}
            name={name}
            style={{
              visibility: "hidden",
              width: 0,
              height: 0,
              position: "absolute",
            }}
            accept={`${type}/*`}
            onChange={(e) => handleFileUpload(e.target.files[0])}
          />
        </>
      )}
    </div>
  );
}

export default DropFileZone;
