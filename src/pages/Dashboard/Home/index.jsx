import { MaterialReactTable } from "material-react-table";
import styles from "./dashboardHome.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardHome() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/Pages`;
  const [data, setData] = useState(null);

  const fetchInfo = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });
      const data = await res.json();
      setData(data);
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while loading pages!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const columns = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Slug",
      accessorKey: "slug",
    },
    {
      header: "Last Modified",
      accessorKey: "lastUpdatedAt",
      render: ({ cell }) => dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a"),
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
  ];

  const handleRowClick = (row) => {
    if (
      ["case-studies", "events", "news", "testimonials"].includes(
        row.original.slug
      )
    ) {
      router(`/dashboard/${row.original.slug}`);
      return;
    }
    router(`/dashboard/pages/${row.original.slug}`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>Pages</h1>
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

export default DashboardHome;
