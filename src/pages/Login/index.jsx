import styles from "./login.module.css";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { mainLogo } from "../../constants/assets";
import { useNavigate } from "react-router-dom";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function Login() {
  const authHeader = useAuthHeader();
  const signIn = useSignIn();
  const router = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const url = `/api/Auth/token`;
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify({
          Email: email,
          Password: password,
        }),
      });

      if (!res.ok) {
        const errorResponse = await res.json();
        setErrorMessage(
          errorResponse.message || "Failed to sign in. Please try again."
        );
        setLoading(false);
        return;
      }

      const data = await res.json();

      if (
        signIn({
          auth: {
            token: data.authorizationToken,
            type: "Bearer",
            expiresIn: 1440,
          },
          expiresIn: 1440,
          userState: {
            email,
            userName: data.userName,
          },
          authState: { email, userName: data.userName },
        })
      ) {
        router(`/dashboard`);
      } else {
        setErrorMessage("Failed to sign in. Please try again.");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("An unexpected error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.subContainer}>
          <div className={styles.imageContainer}>
            <img src={mainLogo} height={35} alt="logo" />
          </div>
          <h2 className={styles.heading}>Hi, Welcome Back!</h2>
          <p className={styles.text}>Enter your credentials to continue</p>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                fullWidth
                label="Enter email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <br />
            <div>
              <TextField
                className={styles.password}
                fullWidth
                label="Enter password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="start"
                      classes={{
                        positionEnd: {
                          marginLeft: 0,
                        },
                      }}
                    >
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <br />
            <div className={styles.rememberContainer}>
              <input
                className={styles.remember}
                type="checkbox"
                id="remember me"
              />
              <label htmlFor="remember me"> Remember me</label>
            </div>
            {errorMessage && (
              <p className={styles.errorMessage}>{errorMessage}</p>
            )}
            <button className={styles.submit} type="submit">
              Login
              {loading && (
                <CircularProgress size={20} style={{ color: "white" }} />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
