import styles from "./dashboardSingleUser.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { TextField, LinearProgress } from "@mui/material";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import PublishSection from "../../../components/PublishSection";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { validatePassword } from "../../../utils/verify_password";

function SingleUserDashboard() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const { id } = useParams();
  const [data, setData] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState("");
  const [isEditMode, setIsEditMode] = useState(!!id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id === "new") {
      setIsEditMode(false);
      return;
    }

    fetch(`/api/Users/${id}`, {
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
      .then((userData) => {
        setData(userData);
        setIsEditMode(true);
      })
      .catch(() => {
        showAlertSnackBar({
          title: "Error while loading user!",
          severity: "error",
        });
      });
  }, [id]);

  const handleSave = async () => {
    setShowError("");
    const passwordErrors = validatePassword(data.password, isEditMode);

    if (passwordErrors.length > 0) {
      setShowError(passwordErrors.join("\n"));
      return;
    }

    try {
      setLoading(true);
      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode ? `/api/Users/${id}` : `/api/Users`;

      const resp = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(data),
      });

      if (resp.ok) {
        setLoading(false);
        await showAlertSnackBar({
          title: `User ${isEditMode ? "updated" : "created"} successfully!`,
          severity: "success",
        });

        router(`/dashboard/users`);
      } else {
        throw new Error();
      }
    } catch {
      await showAlertSnackBar({
        title: "Error while saving user.",
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

  if (!data && isEditMode) {
    return <LinearProgress />;
  }

  return (
    <section className={styles.mainContent}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/users">Users</a> /{" "}
        {isEditMode ? data.userName : "New User"}
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
              <h3>Username</h3>
              <TextField
                name="userName"
                value={data.userName}
                onChange={handleInputChange}
                placeholder="Enter username"
                fullWidth
                required
              />
            </div>
            <div>
              <h3>Email</h3>
              <TextField
                name="email"
                value={data.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                fullWidth
                required
              />
            </div>
            <div>
              <h3>{isEditMode ? "Change Password" : "Password"} </h3>
              <TextField
                name="password"
                type="password"
                value={data.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                fullWidth
              />
              {showError && <p className={styles.errorText}>{showError}</p>}
            </div>
          </div>
          <div>
            <div className={styles.secondColumn}>
              <PublishSection
                loading={loading}
                isEditMode={isEditMode}
                data={data}
              />
              <div></div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SingleUserDashboard;
