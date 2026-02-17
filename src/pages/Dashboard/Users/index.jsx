import { MaterialReactTable } from "material-react-table";
import styles from "./users.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button, Checkbox } from "@mui/material";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function UserDashboard() {
  const navigate = useNavigate();
  const showAlertSnackBar = useAlertSnackBar();
  const authHeader = useAuthHeader();
  const url = `/api/Users`;
  const [data, setData] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      });

      if (!res.ok) {
        throw new Error();
      }

      const users = await res.json();
      setData(users);
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while loading users!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async () => {
    if (!selectedUser) {
      await showAlertSnackBar({
        title: "Please select a user to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/${selectedUser.id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error();
      }

      await showAlertSnackBar({
        title: "User deleted successfully!",
        severity: "success",
      });
      setSelectedUser(null);
      fetchUsers();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting user.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedUser?.id === row.original.id) {
      setSelectedUser(null);
    } else {
      setSelectedUser(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedUser?.id === row.original.id}
          onChange={() => handleCheckboxChange(row)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      header: "User Name",
      accessorKey: "userName",
    },
    {
      header: "Email",
      accessorKey: "email",
    },
  ];

  const handleRowClick = (row) => {
    navigate(`/dashboard/users/${row.original.id}`);
  };

  const handleAddNewUser = () => {
    navigate(`/dashboard/users/new`);
  };

  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>Users</h1>
      <div className={styles.actionsContainer}>
        <Button variant="contained" color="primary" onClick={handleAddNewUser}>
          Add
        </Button>
        <Button
          variant="contained"
          color="error"
          onClick={handleDelete}
          disabled={!selectedUser}
        >
          Delete
        </Button>
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
                selectedUser?.id === row.original.id ? "#f5f5f5" : "inherit",
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

export default UserDashboard;
