import styles from "./dashboardSingleTestimonial.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { LinearProgress, TextField, Button } from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSingleTestimonial() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
  const [data, setData] = useState({
    fullName: "",
    slug: "",
    body: "",
    position: "",
    company: "",
    date: dayjs(),
  });
  const [isEditMode, setIsEditMode] = useState(!!slug);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/Testimonials/${slug}`, {
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
        setData({ ...data, date: dayjs(data.date) });
        setIsEditMode(true);
      })
      .catch((error) => {
        console.error(error);
        showAlertSnackBar({
          title: "Error while loading testimonial!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleSave = async () => {
    const requestData = {
      slug: data.slug,
      fullName: data.fullName,
      body: data.body,
      position: data.position,
      company: data.company,
      date: data.date ? data.date.toISOString() : null,
    };

    try {
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/api/Testimonials/${slug}`
        : `/api/Testimonials`;

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
          title: `Testimonial ${
            isEditMode ? "updated" : "created"
          } successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(`/dashboard/testimonials`);
        }
      } else {
        const error = await resp.json();
        console.error("Error saving testimonial:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } testimonial, try again.`,
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

  const handleDateChange = (newDate) => {
    if (!newDate || !dayjs(newDate).isValid()) {
      showAlertSnackBar({
        title: "Invalid date selected.",
        severity: "warning",
      });
      return;
    }
    setData((old) => ({
      ...old,
      date: newDate,
    }));
  };

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/testimonials">Testimonials</a> /{" "}
        {isEditMode ? (
          <a href={`/dashboard/testimonials/${slug}`}>{data.fullName}</a>
        ) : (
          "New Testimonial"
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
              <h3>Full Name</h3>
              <TextField
                name="fullName"
                value={data.fullName}
                className={styles.textInput}
                required
                placeholder="Enter full name"
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
              <h3>Body</h3>
              <TextField
                name="body"
                value={data.body}
                className={styles.textInput}
                required
                placeholder="Enter testimonial body"
                multiline
                rows={4}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Position</h3>
              <TextField
                name="position"
                value={data.position}
                className={styles.textInput}
                placeholder="Enter position"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Company</h3>
              <TextField
                name="company"
                value={data.company}
                className={styles.textInput}
                placeholder="Enter company"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Date</h3>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  value={data.date}
                  views={["day", "month", "year"]}
                  className={styles.textInput}
                  onChange={handleDateChange}
                  renderInput={(params) => <TextField {...params} required />}
                />
              </LocalizationProvider>
            </div>
          </div>
          <div>
            <div className={styles.secondColumn}>
              <PublishSection
                data={data}
                isEditMode={isEditMode}
                loading={loading}
              />
              <div></div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default DashboardSingleTestimonial;
