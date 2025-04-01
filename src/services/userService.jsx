import axios from "axios";
const API_BASE_URL = "http://localhost:3001/api/v1";

const login = async (email, password) => {
  return await axios.post(API_BASE_URL + "/user/login", {
    email: email,
    password: password,
  });
};

const getProfile = async (token) => {
  return await axios.post(API_BASE_URL + "/user/profile", null, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateProfile = async (user) => {
  try {
    axios.put(API_BASE_URL + "/user/profile", user, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
};

// Export all functions
export default {
  login,
  getProfile,
  updateProfile,
};
