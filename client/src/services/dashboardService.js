import axios from "axios";
import API_URL from "./api";

const API = `${API_URL}/api/dashboard`;

export const getDashboardStats = async () => {
  const response = await axios.get(API);
  return response.data;
};