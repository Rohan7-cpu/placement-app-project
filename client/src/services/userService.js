import axios from "axios";

const API = "http://localhost:5000/api/users";

export const uploadResume = async (id, file) => {
  const formData = new FormData();

  formData.append("resume", file);

  const response = await axios.put(
    `${API}/resume/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const getProfile = async (id) => {
  const response = await axios.get(`${API}/${id}`);
  return response.data.user;
};
export const getUsers = async () => {
  const response = await axios.get(API);
  return response.data.users;
};