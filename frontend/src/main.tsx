import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "./utils/snackbar.util";
import { MasterDataContextProvider } from "./contexts/master-data.context";

const theme = createTheme({ palette: { mode: "dark" } });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <MasterDataContextProvider>
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </MasterDataContextProvider>
  </ThemeProvider>
);
