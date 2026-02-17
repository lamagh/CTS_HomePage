import { MaterialReactTable } from "material-react-table";
import styles from "./successStories.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardSuccessStories() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/SuccessStories`;
  const [data, setData] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);

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
        title: "Error while loading success stories!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedStory) {
      await showAlertSnackBar({
        title: "Please select a success story to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`/api/SuccessStories/${selectedStory.slug}`, {
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
        title: "Success story deleted successfully!",
        severity: "success",
      });
      setSelectedStory(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting success story.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedStory?.slug === row.original.slug) {
      setSelectedStory(null);
    } else {
      setSelectedStory(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedStory?.slug === row.original.slug}
          onChange={() => handleCheckboxChange(row)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
    {
      header: "Last Modified",
      accessorKey: "lastUpdatedAt",
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router(`/dashboard/success-stories/${row.original.slug}`);
  };

  const handleAddNewStory = () => {
    router(`/dashboard/success-stories/new`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>
        <a href="/dashboard/success-stories">Success Stories</a>
      </h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewStory}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedStory}
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
            onClick: () => handleRowClick(row),
            sx: {
              cursor: "pointer",
              backgroundColor:
                selectedStory?.slug === row.original.slug
                  ? "#f5f5f5"
                  : "inherit",
            },
          })}
          state={{
            showProgressBars: data === null,
            showSkeletons: data === null,
          }}
        />
      </div>
    </section>
  );
}

export default DashboardSuccessStories;
