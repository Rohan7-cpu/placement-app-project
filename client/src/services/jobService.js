import axios from "axios";

const API = "http://localhost:5000/api/jobs";

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