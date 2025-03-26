import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export const getClients = () => axios.get(`${API_URL}clients/`);
export const getPackages = () => axios.get(`${API_URL}packages/`);
export const getDeployments = () => axios.get(`${API_URL}deployments/`);
export const createDeployment = (data) =>
  axios.post(`${API_URL}deployments/`, data);
