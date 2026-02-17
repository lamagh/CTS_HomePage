import styles from "./dashboardSingleSuccessStory.module.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { LinearProgress, TextField } from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSingleSuccessStory() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
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

    fetch(`/api/SuccessStories/${slug}`, {
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
          title: "Error while loading success story!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleSave = async () => {
    if (!data.mainImageUrl) {
      showAlertSnackBar({
        title: "Please upload an image.",
        severity: "warning",
      });
      return;
    }
    const requestData = {
      slug: data.slug,
      title: data.title,
      description: data.description,
      mainImageUrl: data.mainImageUrl,
    };

    try {
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/api/SuccessStories/${slug}`
        : `/api/SuccessStories`;

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
          title: `Success story ${
            isEditMode ? "updated" : "created"
          } successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(-1);
        }
      } else {
        const error = await resp.json();
        console.error("Error saving success story:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } success story, try again.`,
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

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> /{" "}
        {isEditMode ? (
          <a href={`/dashboard/success-stories/${slug}`}>{data.title}</a>
        ) : (
          "New Success Story"
        )}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
        }}
      >
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
              <h3>Main Image</h3>
              <DropFileZone
                onChange={handleImageChange}
                type="image"
                editMode
                url={data.mainImageUrl}
                index={0}
                name="mainImageUrl"
              />
            </div>
          </div>
          <div>
            <div className={styles.secondColumn}>
              <PublishSection
                data={data}
                handleSave={handleSave}
                isEditMode={isEditMode}
                loading={loading}
              />
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DashboardSingleSuccessStory;
