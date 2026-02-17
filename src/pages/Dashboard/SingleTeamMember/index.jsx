import styles from "./singleTeamMember.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import PublishSection from "../../../components/PublishSection";
import { contentType } from "../../../constants/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSingleTeamMember() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { id } = useParams();
  const [data, setData] = useState({
    fullName: "",
    position: "",
    imageUrl: "",
    positionOrder: 1,
  });
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === "new") {
      setIsEditMode(false);
      fetchDefaultPosition();
      return;
    }

    fetch(`/api/TeamMembers/${id}`, {
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
          title: "Error while loading team member!",
          severity: "error",
        });
      });
  }, [id]);

  const fetchDefaultPosition = async () => {
    try {
      const res = await fetch(`/api/TeamMembers/count`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch team member count");
      }
      const count = await res.json();
      setData((old) => ({ ...old, positionOrder: count + 1 }));
    } catch (error) {
      console.error(error);
      showAlertSnackBar({
        title: "Error fetching team member count!",
        severity: "error",
      });
    }
  };

  const handleSave = async () => {
    if (!data.imageUrl) {
      showAlertSnackBar({
        title: "Please upload an image.",
        severity: "warning",
      });
      return;
    }
    const requestData = {
      fullName: data.fullName,
      position: data.position,
      imageUrl: data.imageUrl,
      positionOrder: data.positionOrder,
    };

    try {
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/api/TeamMembers/${id}`
        : `/api/TeamMembers`;

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
          title: `Team Member ${
            isEditMode ? "updated" : "created"
          } successfully!`,
          severity: "success",
        });
        router(`/dashboard/team-members`);
      } else {
        const error = await resp.json();
        console.error("Error saving team member:", error);
        await showAlertSnackBar({
          title: `Error while ${
            isEditMode ? "updating" : "creating"
          } team member, try again.`,
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
    setData((prev) => ({ ...prev, imageUrl: value }));
  };

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/team-members">Team Members</a> /{" "}
        {isEditMode ? data.fullName : "New Team Member"}
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
              <h3>Position</h3>
              <TextField
                name="position"
                value={data.position}
                className={styles.textInput}
                required
                placeholder="Enter position"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Order</h3>
              <TextField
                name="positionOrder"
                value={data.positionOrder}
                className={styles.textInput}
                required
                placeholder="Enter position order"
                onChange={handleInputChange}
              />
            </div>
            <div>
              <h3>Image</h3>
              <DropFileZone
                onChange={handleImageChange}
                type={contentType.image}
                editMode
                url={data.imageUrl}
                index={0}
                name="imageUrl"
                size={"1:1"}
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

export default DashboardSingleTeamMember;
