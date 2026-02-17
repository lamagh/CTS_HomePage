import { MaterialReactTable } from "material-react-table";
import styles from "./blogs.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardBlogs() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/Blogs?t=100&p=1&isRecent=true`;
  const [data, setData] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);

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
        title: "Error while loading events!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedBlog) {
      await showAlertSnackBar({
        title: "Please select an event to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`/api/Blogs/${selectedBlog.slug}`, {
        headers: {
          Authorization: authHeader,
        },
        method: "DELETE",
      });

      if (!res.ok) {
        throw Error();
      }

      await showAlertSnackBar({
        title: "Event deleted successfully!",
        severity: "success",
      });
      setSelectedBlog(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting event.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedBlog?.slug === row.original.slug) {
      setSelectedBlog(null);
    } else {
      setSelectedBlog(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedBlog?.slug === row.original.slug}
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
      header: "Is Active",
      accessorKey: "isActive",
      Cell: ({ cell }) => <p>{cell.getValue() ? "Yes" : "No"}</p>,
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
    router(`/dashboard/events/${row.original.slug}`);
  };

  const handleAddNewBlog = () => {
    router(`/dashboard/events/new`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / Events
      </h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewBlog}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedBlog}
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
                selectedBlog?.slug === row.original.slug
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

export default DashboardBlogs;
