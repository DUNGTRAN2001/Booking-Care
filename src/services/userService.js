import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
  console.log("check data from servive", data);
  return axios.post("/api/create-new-user", data);
};
export { handleLoginApi, getAllUser, createNewUserService };
