import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import DialogProvider from "./hooks/useDialog.jsx";
import AlertSnackbarProvider from "./hooks/useAlertSnackbar.jsx";
import App from "./App.jsx";
import "./index.css";
import "./styles/reset.css";
import { HelmetProvider } from "react-helmet-async";
import createStore from "react-auth-kit/createStore";
import AuthProvider from "react-auth-kit";
import LoadingScreen from "./components/LoadingScreen/index.jsx";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "http:",
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider store={store}>
      <DialogProvider>
        <AlertSnackbarProvider>
          <HelmetProvider>
            <Suspense fallback={<LoadingScreen />}>
              <App />
            </Suspense>
          </HelmetProvider>
        </AlertSnackbarProvider>
      </DialogProvider>
    </AuthProvider>
  </StrictMode>
);
