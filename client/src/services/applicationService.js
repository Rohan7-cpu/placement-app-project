import axios from "axios";
import API_URL from "./api";

const API = `${API_URL}/api/applications`;

export const getApplications = async () => {
  const response = await axios.get(API);
  return response.data.applications;
};

export const applyJob = async (application) => {
  const response = await axios.post(API, application);
  return response.data;
};

export const updateApplication = async (id, application) => {
  const response = await axios.put(`${API}/${id}`, application);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};