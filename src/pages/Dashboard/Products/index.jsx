import { MaterialReactTable } from "material-react-table";
import styles from "./products.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardProducts() {
  const authHeader = useAuthHeader();
  const router = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();

  const url = `/api/Products`;
  const [data, setData] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

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
        title: "Error while loading products!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedProduct) {
      await showAlertSnackBar({
        title: "Please select a product to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/${selectedProduct.slug}`, {
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
        title: "Product deleted successfully!",
        severity: "success",
      });
      setSelectedProduct(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting product.",
        severity: "error",
      });
    }
  };

  const handleAddNewProduct = () => {
    router(`/dashboard/products/new`);
  };

  const handleCheckboxChange = (row) => {
    if (selectedProduct?.id === row.original.id) {
      setSelectedProduct(null);
    } else {
      setSelectedProduct(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedProduct?.id === row.original.id}
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
      header: "Last Modified",
      accessorKey: "lastUpdatedAt",
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
  ];

  const handleRowClick = (row) => {
    router(`/dashboard/products/${row.original.slug}`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>Products</h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewProduct}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedProduct}
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
                selectedProduct?.id === row.original.id ? "#f5f5f5" : "inherit",
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

export default DashboardProducts;
