import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { getClients } from "../api";

const ClientList = () => {
  const [clients, setClients] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [osFilter, setOsFilter] = useState("all");

  useEffect(() => {
    getClients()
      .then((response) => setClients(response.data))
      .catch((error) => console.error("Error fetching clients:", error));
  }, []);

  const filteredClients = clients.filter(
    (client) =>
      (statusFilter === "all" || client.status === statusFilter) &&
      (osFilter === "all" || client.os_type === osFilter)
  );

  const uniqueOsTypes = [...new Set(clients.map((client) => client.os_type))];

  return (
    <div>
      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            label="Status"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="online">Online</MenuItem>
            <MenuItem value="offline">Offline</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" style={{ minWidth: 120 }}>
          <InputLabel>OS Type</InputLabel>
          <Select
            value={osFilter}
            onChange={(e) => setOsFilter(e.target.value)}
            label="OS Type"
          >
            <MenuItem value="all">All</MenuItem>
            {uniqueOsTypes.map((os) => (
              <MenuItem key={os} value={os}>
                {os}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Hostname</TableCell>
              <TableCell>IP Address</TableCell>
              <TableCell>OS Type</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Check-in</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={client.id}>
                <TableCell>{client.hostname}</TableCell>
                <TableCell>{client.ip_address}</TableCell>
                <TableCell>{client.os_type}</TableCell>
                <TableCell>{client.status}</TableCell>
                <TableCell>
                  {new Date(client.last_checkin).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ClientList;
