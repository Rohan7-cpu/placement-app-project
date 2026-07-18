import axios from "axios";
import API_URL from "./api";

const API = `${API_URL}/api/jobs`;

export const getJobs = async () => {
  const response = await axios.get(API);
  return response.data.jobs;
};

export const addJob = async (job) => {
  const response = await axios.post(API, job);
  return response.data;
};

export const updateJob = async (id, job) => {
  const response = await axios.put(`${API}/${id}`, job);
  return response.data;
};

export const deleteJob = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};