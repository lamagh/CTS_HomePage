import { Outlet } from "react-router-dom";
import DashboardNav from "../DashboardNav";
import DashboardBody from "../DashboardBody";
import { createTheme, ThemeProvider } from "@mui/material";

function DashboardLayout() {
  const theme = createTheme({
    components: {
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: `#dddedd`,
              borderRadius: `10px`,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <DashboardNav>
        <DashboardBody>
          <Outlet />
        </DashboardBody>
      </DashboardNav>
    </ThemeProvider>
  );
}

export default DashboardLayout;
