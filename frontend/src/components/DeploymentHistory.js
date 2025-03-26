import React, { useState, useEffect } from "react";
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
import { getDeployments } from "../api";

const DeploymentHistory = () => {
  const [deployments, setDeployments] = useState([]);

  useEffect(() => {
    // Initial fetch
    getDeployments()
      .then((res) => setDeployments(res.data))
      .catch((err) => console.error("Error fetching deployments:", err));

    // WebSocket connection
    const ws = new WebSocket("ws://localhost:8000/ws/deployments/");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("🔄 WebSocket Message:", data); // 👈

      setDeployments((prev) =>
        prev.map((dep) =>
          dep.id === data.id
            ? { ...dep, status: data.status, updated_at: data.updated_at }
            : dep
        )
      );
    };

    ws.onerror = (err) => console.error("WebSocket error:", err);
    ws.onclose = () => console.log("WebSocket disconnected.");

    ws.onopen = () => {
      console.log("WebSocket connected.");
    };

    return () => ws.close(); // Cleanup
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
