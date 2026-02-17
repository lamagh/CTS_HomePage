import styles from "./dashboardSingleService.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { LinearProgress, TextField, CircularProgress } from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { contentType } from "../../../constants/types";
import dayjs from "dayjs";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSingleService() {
  const authHeader = useAuthHeader();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
  const router = useNavigate();
  const [data, setData] = useState({
    title: "",
    slug: "",
    description: "",
    mainImageUrl: "",
  });
  const [isEditMode, setIsEditMode] = useState(!!slug);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/Services/${slug}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
    })
      .then((resp) => {
        if (!resp.ok) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .then((data) => {
        setData(data);
        setIsEditMode(true);
      })
      .catch((error) => {
        console.error(error);
        showAlertSnackBar({
          title: "Error while loading service!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleServiceSave = async () => {
    if (!data.mainImageUrl) {
      showAlertSnackBar({
        title: "Please upload a media.",
        severity: "warning",
      });
      return;
    }
    const requestData = {
      Slug: data.slug,
      Title: data.title,
      Description: data.description,
      MainImageUrl: data.mainImageUrl,
    };

    const method = isEditMode ? "PUT" : "POST";
    const endpoint = isEditMode ? `/api/Services/${slug}` : `/api/Services`;

    try {
      setLoading(true);
      const resp = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(requestData),
      });

      if (resp.ok) {
        setLoading(false);
        await showAlertSnackBar({
          title: `Service ${isEditMode ? "updated" : "created"} successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(`/dashboard/services`);
        }
      } else {
        const error = await resp.json();
        console.error("Error saving service:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } service, try again.`,
          severity: "error",
        });
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      await showAlertSnackBar({
        title: "An unexpected error occurred.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setData((old) => ({
      ...old,
      [name]: value,
    }));
  };

  const handleImageChange = (index, type, e) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, mainImageUrl: value }));
  };

  if (!data && isEditMode) {
    return (
      <div style={{ width: "100%", paddingRight: "2rem" }}>
        <LinearProgress color="primary" />
      </div>
    );
  }

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / {isEditMode ? data.title : "New Service"}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleServiceSave();
        }}
      >
        {" "}
        <div className={styles.mainContentContainer}>
          <div className={styles.firstColumn}>
            <div>
              <h3>Title</h3>
              <TextField
                name="title"
                value={data.title}
                className={styles.textInput}
                required
                placeholder="Enter title"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Slug</h3>
              <TextField
                name="slug"
                value={data.slug}
                className={styles.textInput}
                required
                placeholder="Enter slug"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Description</h3>
              <TextField
                name="description"
                value={data.description}
                className={styles.textInput}
                multiline
                rows={6}
                required
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Media</h3>
              <DropFileZone
                onChange={handleImageChange}
                type={contentType.image}
                index={data.id}
                editMode={true}
                url={data.mainImageUrl}
                name="mainImageUrl"
              />
            </div>
          </div>
          <div>
            <div className={styles.secondColumn}>
              <PublishSection
                loading={loading}
                isEditMode={isEditMode}
                data={data}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DashboardSingleService;
