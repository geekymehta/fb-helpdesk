import axios from "axios";
const apiUri = import.meta.env.VITE_API_URI;

const authRoute = `${apiUri}/api/auth/`;

const register = async ({ name, email, password, persistUser }) => {
  console.log("registerData: ", { name, email, password, persistUser });
  const userData = { name, email, password };
  console.log("userData: ", userData);
  const response = await axios.post(authRoute + "register", userData);

  if (response.data && persistUser) {
    console.log("persisting user: ");
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

const login = async ({ email, password, persistUser }) => {
  console.log("loginData: ", { email, password, persistUser });
  const userData = { email, password };
  const response = await axios.post(authRoute + "login", userData);

  if (response.data && persistUser) {
    const user = response.data;
    const item = {
      data: user,
      expiry: new Date().getTime() + 30 * 24 * 60 * 60 * 1000, // 30 days from now
    };
    console.log("persisting user: ", item);
    localStorage.setItem("user", JSON.stringify(item));
    console.log("persisted user1: ", localStorage.getItem("user"));
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
