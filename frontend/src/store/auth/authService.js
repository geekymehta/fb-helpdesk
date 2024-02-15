import axios from "axios";
const apiUri = import.meta.env.VITE_API_URI;

const authRoute = `${apiUri}/api/auth/`;

const register = async (userData) => {
  console.log("userData: ", userData);
  const response = await axios.post(authRoute + "register", userData);

  if (response.data) {
    const user = response.data;
    const item = {
      data: user,
      expiry: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    };
    localStorage.setItem("user", JSON.stringify(item));
  }

  console.log("response.data: ", response.data);
  return response.data;
};

const login = async (userData) => {
  console.log("userData: ", userData);
  //check type of userData
  const response = await axios.post(authRoute + "login", userData);

  if (response.data) {
    const user = response.data;
    const item = {
      data: user,
      expiry: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    };
    localStorage.setItem("user", JSON.stringify(item));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};
export default authService;
