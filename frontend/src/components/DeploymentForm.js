import React, { useState, useEffect } from "react";
import axios from "axios";
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

const DeploymentForm = () => {
  const [clients, setClients] = useState([]);
  const [packages, setPackages] = useState([]);
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedPackage, setSelectedPackage] = useState("");

  useEffect(() => {
    const fetchClientsAndPackages = async () => {
      try {
        const clientsResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}clients/`
        );
        const packagesResponse = await axios.get(
          `${process.env.REACT_APP_API_URL}packages/`
        );

        setClients(clientsResponse.data);
        setPackages(packagesResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchClientsAndPackages();
  }, []);

  const handleDeployment = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}deployments/`, {
        client: selectedClient,
        package: selectedPackage,
        status: "pending",
      });

      alert("Deployment created successfully!");
      // Reset form
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
