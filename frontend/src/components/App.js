import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
} from "@mui/material";

import ClientList from "./ClientList";
import PackageList from "./PackageList";
import DeploymentForm from "./DeploymentForm";
import DeploymentHistory from "./DeploymentHistory";

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Software Deployment System
          </Typography>
          <Box>
            <Button color="inherit" component={Link} to="/">
              Clients
            </Button>
            <Button color="inherit" component={Link} to="/packages">
              Packages
            </Button>
            <Button color="inherit" component={Link} to="/deploy">
              Deploy
            </Button>
            <Button color="inherit" component={Link} to="/history">
              History
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" style={{ marginTop: "20px" }}>
        <Routes>
          <Route path="/" element={<ClientList />} />
          <Route path="/packages" element={<PackageList />} />
          <Route path="/deploy" element={<DeploymentForm />} />
          <Route path="/history" element={<DeploymentHistory />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
