import { MaterialReactTable } from "material-react-table";
import styles from "./teamMembers.module.css";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { useAlertSnackBar } from "../../../hooks/useAlertSnackbar";
import { Box, Button, Checkbox } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";

function DashboardTeamMembers() {
  const showAlertSnackBar = useAlertSnackBar();
  const router = useNavigate();
  const authHeader = useAuthHeader();
  const url = `/api/TeamMembers`;
  const [data, setData] = useState(null);
  const [selectedTeamMember, setSelectedTeamMember] = useState(null);

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
        title: "Error while loading team members!",
        severity: "error",
      });
      setData([]);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  const handleDelete = async () => {
    if (!selectedTeamMember) {
      await showAlertSnackBar({
        title: "Please select a team member to delete.",
        severity: "warning",
      });
      return;
    }

    try {
      const res = await fetch(`${url}/${selectedTeamMember.id}`, {
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
        title: "Team member deleted successfully!",
        severity: "success",
      });
      setSelectedTeamMember(null);
      fetchInfo();
    } catch (error) {
      await showAlertSnackBar({
        title: "Error while deleting team member.",
        severity: "error",
      });
    }
  };

  const handleCheckboxChange = (row) => {
    if (selectedTeamMember?.id === row.original.id) {
      setSelectedTeamMember(null);
    } else {
      setSelectedTeamMember(row.original);
    }
  };

  const columns = [
    {
      header: "Select",
      Cell: ({ row }) => (
        <Checkbox
          checked={selectedTeamMember?.id === row.original.id}
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
      header: "Position",
      accessorKey: "position",
    },
    {
      header: "Order",
      accessorKey: "positionOrder",
    },

    {
      header: "Created At",
      accessorKey: "createdAt",
      Cell: ({ cell }) => (
        <p>{dayjs(cell.getValue()).format("DD/MM/YYYY hh:mm a")}</p>
      ),
    },
  ];
  const handleAddNewMember = () => {
    router(`/dashboard/team-members/new`);
  };
  const handleRowClick = (row) => {
    router(`/dashboard/team-members/${row.original.id}`);
  };
  return (
    <section className={styles.sectionContainer}>
      <h1 className={styles.mainTitle}>Team Members</h1>
      <div className={styles.actionsContainer}>
        <Box display="flex" alignItems="center" gap="15px" mb={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddNewMember}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={!selectedTeamMember}
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
                selectedTeamMember?.id === row.original.id
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

export default DashboardTeamMembers;
