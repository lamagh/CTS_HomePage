import { MaterialReactTable } from "material-react-table";
import styles from "./dashboardNews.module.css";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
} from "@mui/material";
import DropFileZone from "../../../components/DropFileZone";
import { contentType } from "../../../constants/types";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { Link } from "react-router-dom";

function DashboardNews() {
  const authHeader = useAuthHeader();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/News`;
  const [data, setData] = useState(null);
  const [selectedNews, setSelectedNews] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [newNews, setNewNews] = useState({
    imageUrl: "",
  });

  const fetchInfo = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!res.ok) {
        throw Error();
      }

      const data = await res.json();
      setData(data);
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while loading news!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedNews) {
      await showAlertSnackBar({
        title: "Please select a news item to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/${selectedNews.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        method: "DELETE",
      });

      if (!res.ok) {
        throw Error();
      }

      await showAlertSnackBar({
        title: "News deleted successfully!",
        severity: "success",
      });
      setSelectedNews(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting news.",
        severity: "error",
      });
    }
  };

  const handleAddNew = async () => {
    if (!newNews.imageUrl) {
      await showAlertSnackBar({
        title: "Please upload an image.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        body: JSON.stringify(newNews),
      });

      if (!res.ok) {
        throw Error();
      }

      await showAlertSnackBar({
        title: "News added successfully!",
        severity: "success",
      });
      setOpenDialog(false);
      setNewNews({ imageUrl: "" });
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while adding news.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    setSelectedNews((prev) =>
      prev?.id === row.original.id ? null : row.original
    );
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedNews?.id === row.original.id}
          onChange={() => handleCheckboxChange(row)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      header: "Image",
      accessorKey: "imageUrl",
      Cell: ({ cell }) => (
        <div className={styles.tableImgWrapper}>
          <img src={cell.getValue()} alt="News" />
        </div>
      ),
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
  ];

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / News
      </h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedNews}
          >
            Delete
          </Button>
        </Box>
      </div>
      <div className={styles.tableContainer}>
        <MaterialReactTable
          data={data || []}
          columns={columns}
          enableFullScreenToggle={false}
          enableDensityToggle={false}
          enableHiding={false}
          muiTableBodyRowProps={({ row }) => ({
            sx: {
              cursor: "pointer",
              backgroundColor:
                selectedNews?.id === row.original.id ? "#f5f5f5" : "inherit",
            },
          })}
          state={{
            showProgressBars: data === null,
            showSkeletons: data === null,
          }}
        />
      </div>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        sx={{
          "& .MuiDialog-paper": {
            width: "500px",
            maxWidth: "500px",
            borderRadius: "10px",
          },
        }}
      >
        <DialogTitle>Add New </DialogTitle>
        <DialogContent>
          <div className={styles.dialogContent}>
            <DropFileZone
              onChange={(index, type, e) =>
                setNewNews((prev) => ({ ...prev, imageUrl: e.target.value }))
              }
              editMode
              url={newNews.imageUrl}
              type={contentType.image}
              index={0}
              name="imageUrl"
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddNew} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
}

export default DashboardNews;
