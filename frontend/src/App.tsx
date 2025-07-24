import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { darkTheme } from './theme/theme';
import { LayoutProvider } from './contexts/LayoutContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <LayoutProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="assets" element={<Assets />} />
              {/* <Route path="hardware" element={<Hardware />} />
              <Route path="software" element={<Software />} />
              <Route path="users" element={<Users />} />
              <Route path="assignments" element={<Assignments />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} /> */}
            </Route>
          </Routes>
        </Router>
      </LayoutProvider>
    </ThemeProvider>
  );
}

export default App;