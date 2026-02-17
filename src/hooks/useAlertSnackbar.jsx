import { Alert, Slide, Snackbar } from "@mui/material";
import { createContext, useContext, useState } from "react";

const AlertSnackBarContext = createContext(() => {
  throw new Error("Component is not wrapped with a AlertSnackbarProvider.");
});

const AlertSnackbarProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({
    title: "",
  });

  const [promiseInfo, setPromiseInfo] = useState();
  const showAlertSnackbar = (options) => {
    return new Promise((resolve, reject) => {
      setPromiseInfo({ resolve, reject });
      setOptions(options);
      setOpen(true);
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    promiseInfo?.resolve(true);
    setPromiseInfo(undefined);
  };

  const handleCancel = (e, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    promiseInfo?.resolve(false);
    setPromiseInfo(undefined);
  };

  function CustomSlide(props) {
    return <Slide {...props} direction="left" />;
  }

  return (
    <>
      <Snackbar
        key={CustomSlide.name}
        open={open}
        onClose={handleCancel}
        autoHideDuration={2000}
        TransitionComponent={CustomSlide}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCancel}
          severity={options.severity}
          variant="filled"
          sx={{ width: "100%", fontWeight: "400", letterSpacing: "0.5px" }}
        >
          {options.title}
        </Alert>
      </Snackbar>
      <AlertSnackBarContext.Provider value={showAlertSnackbar}>
        {children}
      </AlertSnackBarContext.Provider>
    </>
  );
};

export const useAlertSnackBar = () => {
  return useContext(AlertSnackBarContext);
};

export default AlertSnackbarProvider;
