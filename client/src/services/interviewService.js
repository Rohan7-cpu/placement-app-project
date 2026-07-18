import axios from "axios";
import API_URL from "./api";

const API = `${API_URL}/api/interviews`;

export const getInterviews = async () => {
  const response = await axios.get(API);
  return response.data.interviews;
};

export const addInterview = async (interview) => {
  const response = await axios.post(API, interview);
  return response.data;
};

export const updateInterview = async (id, interview) => {
  const response = await axios.put(`${API}/${id}`, interview);
  return response.data;
};

export const deleteInterview = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};