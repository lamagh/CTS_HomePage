import styles from "./dashboardSingleBlog.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { LinearProgress, TextField, IconButton } from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { contentType } from "../../../constants/types";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useNavigate } from "react-router-dom";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

function DashboardSingleBlog() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
  const [data, setData] = useState({
    title: "",
    slug: "",
    blogImages: [],
    createdAt: dayjs(),
  });
  const [isEditMode, setIsEditMode] = useState(!!slug);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/Blogs/${slug}`, {
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
        setData({
          ...data,
          blogImages: data.blogImages || [],
          createdAt: dayjs(data.createdAt),
        });
        setIsEditMode(true);
      })
      .catch((error) => {
        console.error(error);
        showAlertSnackBar({
          title: "Error while loading event!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleSave = async () => {
    const validImages = data.blogImages.filter((img) => img.imageUrl.trim());
    if (validImages.length === 0) {
      await showAlertSnackBar({
        title: "Please upload at least one image.",
        severity: "warning",
      });
      return;
    }

    const requestData = {
      slug: data.slug,
      title: data.title,
      createdAt: data.createdAt.toISOString(),
      blogImages: validImages.map((img) => ({ imageUrl: img.imageUrl })),
    };

    try {
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode ? `/api/Blogs/${slug}` : `/api/Blogs`;

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
          title: `Event ${isEditMode ? "updated" : "created"} successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(`/dashboard/events`);
        }
      } else {
        const error = await resp.json();
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } event, try again.`,
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
    setData((prev) => {
      const updatedImages = [...prev.blogImages];
      updatedImages[index] = { ...updatedImages[index], imageUrl: value };
      return { ...prev, blogImages: updatedImages };
    });
  };

  const addImageInput = () => {
    setData((old) => ({
      ...old,
      blogImages: [...old.blogImages, { imageUrl: "" }],
    }));
  };

  const removeImageInput = (index) => {
    setData((old) => {
      const updatedImages = [...old.blogImages];
      updatedImages.splice(index, 1);
      return { ...old, blogImages: updatedImages };
    });
  };

  const handleDateChange = (newDate) => {
    if (!newDate) {
      showAlertSnackBar({
        title: "Invalid date selected.",
        severity: "warning",
      });
      return;
    }

    setData((old) => ({
      ...old,
      createdAt: newDate,
    }));
  };

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/events">Events</a> /{" "}
        {isEditMode ? (
          <a href={`/dashboard/events/${slug}`}>{data.title}</a>
        ) : (
          "New Event"
        )}
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSave();
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
              <h3>Event Date</h3>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={data.createdAt}
                  views={["day", "month", "year"]}
                  className={styles.textInput}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </div>

            <div>
              <h3>Media</h3>
              {data.blogImages.map((image, index) => (
                <div key={index} className={styles.imageInputContainer}>
                  <div className={styles.uploadImgDelete}>
                    <DropFileZone
                      onChange={handleImageChange}
                      type={contentType.image}
                      index={index}
                      editMode={true}
                      url={image.imageUrl}
                      name="imageUrl"
                    />

                    <DeleteOutlineIcon
                      className={styles.deleteIcon}
                      onClick={() => removeImageInput(index)}
                    />
                  </div>
                </div>
              ))}
              <IconButton onClick={addImageInput} className={styles.addButton}>
                <AddIcon />
              </IconButton>
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

export default DashboardSingleBlog;
