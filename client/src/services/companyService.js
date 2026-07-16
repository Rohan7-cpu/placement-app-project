import axios from "axios";

const API = "http://localhost:5000/api/companies";

export const getCompanies = async () => {
  const response = await axios.get(API);
  return response.data.companies;
};

export const addCompany = async (company) => {
  const response = await axios.post(API, company);
  return response.data;
};

export const updateCompany = async (id, company) => {
  const response = await axios.put(`${API}/${id}`, company);
  return response.data;
};

export const deleteCompany = async (id) => {
  const response = await axios.delete(`${API}/${id}`);
  return response.data;
};