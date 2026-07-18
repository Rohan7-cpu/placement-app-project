import axios from "axios";
import API_URL from "./api";

const API = `${API_URL}/api/reports`;

export const getReports = async () => {
  const response = await axios.get(API);
  return response.data;
};