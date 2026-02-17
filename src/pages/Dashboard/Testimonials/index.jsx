import { MaterialReactTable } from "material-react-table";
import styles from "./testimonials.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardTestimonials() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/Testimonials`;
  const [data, setData] = useState(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

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
        title: "Error while loading testimonials!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedTestimonial) {
      await showAlertSnackBar({
        title: "Please select a testimonial to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`/api/Testimonials/${selectedTestimonial.slug}`, {
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
        title: "Testimonial deleted successfully!",
        severity: "success",
      });
      setSelectedTestimonial(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting testimonial.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedTestimonial?.slug === row.original.slug) {
      setSelectedTestimonial(null);
    } else {
      setSelectedTestimonial(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedTestimonial?.slug === row.original.slug}
          onChange={() => handleCheckboxChange(row)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      header: "Full Name",
      accessorKey: "fullName",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Company",
      accessorKey: "company",
    },
    {
      header: "Position",
      accessorKey: "position",
    },
    {
      header: "Date",
      accessorKey: "date",
      Cell: ({ cell }) => <p>{dayjs(cell.getValue()).format("DD/MM/YYYY")}</p>,
    },
  ];

  const handleRowClick = (row) => {
    router(`/dashboard/testimonials/${row.original.slug}`);
  };

  const handleAddNewTestimonial = () => {
    router(`/dashboard/testimonials/new`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / Testimonials
      </h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewTestimonial}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedTestimonial}
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
                selectedTestimonial?.slug === row.original.slug
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

export default DashboardTestimonials;
