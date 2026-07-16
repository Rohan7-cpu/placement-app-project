import axios from "axios";

const API = "http://localhost:5000/api/reports";

export const getReports = async () => {
  const response = await axios.get(API);
  return response.data;
};