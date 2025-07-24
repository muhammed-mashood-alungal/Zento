import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { darkTheme } from "./theme/theme";
import { LayoutProvider } from "./contexts/LayoutContext";
import Layout from "./components/layout/Layout";
import Dashboard from "./pages/Dashboard";
import Branches from "./pages/Branches";
import Categories from "./pages/Categories";
import Manufacturers from "./pages/Manufacturers";
import Vendors from "./pages/Vendors";

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LayoutProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="branches" element={<Branches />} />
              <Route path="categories" element={<Categories />} />
              <Route path="manufacturers" element={<Manufacturers />} />
              <Route path="vendors" element={<Vendors />} />
            </Route>
          </Routes>
        </Router>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;
