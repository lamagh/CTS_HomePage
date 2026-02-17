import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { createContext, useContext, useState } from "react";

const DialogContext = createContext(() => {
  throw new Error("Component is not wrapped with a DialogProvider.");
});

const DialogProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({
    title: "",
  });

  const [promiseInfo, setPromiseInfo] = useState();
  const showDialog = (options) => {
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

  const handleCancel = () => {
    setOpen(false);
    promiseInfo?.resolve(false);
    setPromiseInfo(undefined);
  };

  return (
    <>
      <Dialog open={open} onClose={handleCancel}>
        <DialogTitle>{options.title}</DialogTitle>
        <DialogContent sx={{ minWidth: "400px" }}>
          {options.message && (
            <DialogContentText>{options.message}</DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          {!options.confirm && (
            <>
              <Button onClick={handleCancel}>Ok</Button>
            </>
          )}
          {options.confirm && (
            <>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button variant="contained" onClick={handleConfirm}>
                Confirm
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
      <DialogContext.Provider value={showDialog}>
        {children}
      </DialogContext.Provider>
    </>
  );
};

export const useDialog = () => {
  return useContext(DialogContext);
};

export default DialogProvider;
