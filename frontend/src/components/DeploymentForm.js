import React, { useState, useEffect } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { getClients, getPackages, createDeployment } from "../api";

const DeploymentForm = () => {
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsRes = await getClients();
        const packagesRes = await getPackages();
        setClients(clientsRes.data);
        setPackages(packagesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDeployment = async () => {
    try {
      await createDeployment({
        client: selectedClient,
        package: selectedPackage,
        status: "pending",
      });

      alert("Deployment created successfully!");
      setSelectedClient("");
      setSelectedPackage("");
    } catch (error) {
      console.error("Error creating deployment:", error);
      alert("Failed to create deployment");
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 4 }}>
        <Typography variant="h4">Create Deployment</Typography>

        <FormControl fullWidth>
          <InputLabel>Select Client</InputLabel>
          <Select
            value={selectedClient}
            label="Select Client"
            onChange={(e) => setSelectedClient(e.target.value)}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.hostname} ({client.ip_address})
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Select Package</InputLabel>
          <Select
            value={selectedPackage}
            label="Select Package"
            onChange={(e) => setSelectedPackage(e.target.value)}
          >
            {packages.map((pkg) => (
              <MenuItem key={pkg.id} value={pkg.id}>
                {pkg.name} - {pkg.version}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={handleDeployment}
          disabled={!selectedClient || !selectedPackage}
        >
          Create Deployment
        </Button>
      </Box>
    </Container>
  );
};

export default DeploymentForm;
