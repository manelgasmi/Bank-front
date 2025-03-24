import axios from "axios";
const API_BASE_URL = "http://localhost:3001/api/v1";

const login = async (email, password) => {
  try {
    const token = await axios.post(API_BASE_URL + "/user/login", {
      email: email,
      password: password,
    });
    // TODO : save token
    // TODO : get profile()
    console.log(token);
  } catch (error) {
    console.error(error);
  }
};

const getProfile = async () => {
  try {
    axios.post(API_BASE_URL + "/user/profile", null, {
      headers: { Authorization: `Bearer ${token}` },
    });
  } catch (error) {
    console.error(error);
  }
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
