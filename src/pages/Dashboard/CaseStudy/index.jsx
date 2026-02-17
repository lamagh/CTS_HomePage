import { MaterialReactTable } from "material-react-table";
import styles from "./dashboardCaseStudy.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardCaseStudies() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/CaseStudies?t=100&p=1`;
  const [data, setData] = useState(null);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

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
      console.log(data);
      setData(data);
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while loading case studies!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedCaseStudy) {
      await showAlertSnackBar({
        title: "Please select a case study to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`/api/CaseStudies/${selectedCaseStudy.slug}`, {
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
        title: "Case study deleted successfully!",
        severity: "success",
      });
      setSelectedCaseStudy(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting case study.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedCaseStudy?.slug === row.original.slug) {
      setSelectedCaseStudy(null);
    } else {
      setSelectedCaseStudy(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedCaseStudy?.slug === row.original.slug}
          onChange={() => handleCheckboxChange(row)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Created At",
      accessorKey: "createdAt",
      Cell: ({ cell }) => <p>{dayjs(cell.getValue()).format("DD/MM/YYYY")}</p>,
    },
    {
      header: "Last Updated At",
      accessorKey: "lastUpdatedAt",
      Cell: ({ cell }) => <p>{dayjs(cell.getValue()).format("DD/MM/YYYY")}</p>,
    },
  ];

  const handleRowClick = (row) => {
    router(`/dashboard/case-studies/${row.original.slug}`);
  };

  const handleAddNewCaseStudy = () => {
    router(`/dashboard/case-studies/new`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>
        <Link to={-1}>Back</Link> / Case Studies
      </h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewCaseStudy}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedCaseStudy}
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
                selectedCaseStudy?.slug === row.original.slug
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

export default DashboardCaseStudies;
