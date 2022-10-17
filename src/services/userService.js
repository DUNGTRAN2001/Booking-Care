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
const deleteUserService = (userId) => {
  // return axios.delete("/api/delete-user", { id: userId });
  //đúng chuẩn axios
  return axios.delete("/api/delete-user", {
    data: {
      id: userId,
    },
  });
};
const editUserService = (inputData) => {
  return axios.put("/api/edit-user", inputData);
};
export {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
};
