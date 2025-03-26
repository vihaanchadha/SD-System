import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";

const DeploymentHistory = () => {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    const fetchDeployments = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}deployments/`
        );
        setDeployments(response.data);
      } catch (error) {
        console.error("Error fetching deployments:", error);
      }
    };

    fetchDeployments();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "success";
      case "pending":
        return "warning";
      case "in_progress":
        return "info";
      case "failed":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Client</TableCell>
            <TableCell>Package</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell>Updated At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {deployments.map((deployment) => (
            <TableRow key={deployment.id}>
              <TableCell>{deployment.client}</TableCell>
              <TableCell>{deployment.package}</TableCell>
              <TableCell>
                <Chip
                  label={deployment.status}
                  color={getStatusColor(deployment.status)}
                  size="small"
                />
              </TableCell>
              <TableCell>
                {new Date(deployment.created_at).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(deployment.updated_at).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DeploymentHistory;
