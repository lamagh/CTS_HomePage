import styles from "./dashboardSingleProduct.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { globeIcon, previewIcon } from "../../../constants/assets";
import { TextField } from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { useNavigate } from "react-router-dom";
import { contentType } from "../../../constants/types";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import MultipleSelectInput from "../../../components/MultiSelectInput";

function DashboardSingleProduct() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { slug } = useParams();
  const [data, setData] = useState({
    title: "",
    slug: "",
    category: "",
    shortDescription: "",
    description: "",
    mainImageUrl: "",
    logoUrl: "",
  });
  const [isEditMode, setIsEditMode] = useState(!!slug);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (slug === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/Products/${slug}`, {
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
          title: "Error while loading product!",
          severity: "error",
        });
      });
  }, [slug]);

  const handleSave = async () => {
    const requestData = { ...data };

    try {
      if (!data.logoUrl) {
        showAlertSnackBar({
          title: "Please upload a logo image.",
          severity: "warning",
        });
        return;
      }
      if (!data.mainImageUrl) {
        showAlertSnackBar({
          title: "Please upload a background image.",
          severity: "warning",
        });
        return;
      }
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode ? `/api/Products/${slug}` : `/api/Products`;

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
          title: `Product ${isEditMode ? "updated" : "created"} successfully!`,
          severity: "success",
        });
        if (!isEditMode) {
          router(`/dashboard/products`);
        }
      } else {
        const error = await resp.json();
        console.error("Error saving product:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } product, try again.`,
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

  const handleLogoChange = (index, type, e) => {
    const { value } = e.target;
    setData((prev) => ({ ...prev, logoUrl: value }));
  };

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / {isEditMode ? data.title : "New Product"}
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
              <h3>Categories</h3>
              <MultipleSelectInput
                value={
                  data.category.split(",") == 0
                    ? []
                    : data.category.split(",").map((e) => ({ title: e }))
                }
                options={[
                  {
                    title: "Higher Education",
                  },
                  {
                    title: "K-12",
                  },
                ]}
                label="Select Categories"
                onChange={(value) => {
                  console.error(value);
                  setData((prev) => ({
                    ...prev,
                    category: value.map((e) => e.title).join(","),
                  }));
                }}
              />
            </div>
            <div>
              <h3>Short Description</h3>
              <TextField
                name="shortDescription"
                value={data.shortDescription}
                className={styles.textInput}
                required
                placeholder="Enter short description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Full Description</h3>
              <TextField
                name="description"
                value={data.description}
                className={styles.textInput}
                multiline
                rows={4}
                required
                placeholder="Enter description"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Logo</h3>
              <DropFileZone
                onChange={handleLogoChange}
                type={contentType.image}
                index={0}
                editMode={true}
                url={data.logoUrl}
                name="logoUrl"
              />
            </div>
            <div>
              <h3>Background Image</h3>
              <DropFileZone
                onChange={handleImageChange}
                type={contentType.image}
                index={1}
                editMode={true}
                url={data.mainImageUrl}
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

export default DashboardSingleProduct;
