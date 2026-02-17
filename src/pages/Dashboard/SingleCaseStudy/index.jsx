import styles from "./dashboardSingleCaseStudy.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, Button } from "@mui/material";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import RichTextEditor from "../../../components/RichTextEditor";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSingleCaseStudy() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
  const [data, setData] = useState({
    slug: "",
    body: "",
  });
  const [isEditMode, setIsEditMode] = useState(!!slug);
  const [loading, setLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/CaseStudies/${slug}`, {
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
        setData({ slug: data.slug, body: JSON.parse(data.body) });
        console.log(data);
        setIsEditMode(true);
      })
      .catch((error) => {
        console.error(error);
        showAlertSnackBar({
          title: "Error while loading case study!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleSave = async () => {
    if (!data.body) {
      showAlertSnackBar({
        title: "Please write a content.",
        severity: "warning",
      });
      return;
    }
    const requestData = {
      slug: data.slug,
      body: JSON.stringify(data.body),
    };

    try {
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/api/CaseStudies/${slug}`
        : `/api/CaseStudies`;

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
          title: `Case Study ${
            isEditMode ? "updated" : "created"
          } successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(`/dashboard/case-studies`);
        }
      } else {
        const error = await resp.json();
        console.error("Error saving case study:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } case study, try again.`,
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

  const handleBodyChange = (content) => {
    setData((old) => ({
      ...old,
      body: content,
    }));
  };
  console.error("Initial Content:", data?.body);

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/case-studies">Case Studies</a> /{" "}
        {isEditMode ? slug : "New Case Study"}
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
              <h3 className={styles.title}>Slug</h3>
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
              <h3 className={styles.title}>Content</h3>
              <div className={styles.richTextEditor}>
                <RichTextEditor
                  initialContent={data.body}
                  onContentChange={handleBodyChange}
                />
              </div>
            </div>
          </div>
          <div>
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
        </div>
      </form>
    </section>
  );
}

export default DashboardSingleCaseStudy;
