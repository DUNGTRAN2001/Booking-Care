import axios from "../axios";

const handleLoginApi = (email, password) => {
  return axios.post("api/login", { email, password });
};
const getAllUser = (inputId) => {
  return axios.get(`/api/get-all-users?id=${inputId}`);
};
const createNewUserService = (data) => {
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
const getAllCodeService = (inputType) => {
  return axios.get(`/api/allcode?type=${inputType}`);
};
const getTopDoctorHomeService = (limit) => {
  return axios.get(`/api/top-doctor-home?limit=${limit}`);
};
const getAllDoctors = () => {
  return axios.get("/api/get-all-doctors");
};
const saveDetailDoctor = (data) => {
  return axios.post("/api/save-infor-doctor", data);
};
const getDetailInforDoctor = (doctorId) => {
  return axios.get(`/api/get-detail-doctor-by-id?id=${doctorId}`);
};
const saveBulkScheduleDoctor = (data) => {
  return axios.post("/api/bulk-create-schedule", data);
};
const getScheduleDoctorByDate = (doctorId, date) => {
  return axios.get(
    `/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`
  );
};
const getExtraInforDotorById = (doctorId) => {
  return axios.get(
    `/api/get-extra-infor-doctor-by-id?doctorId=${doctorId}`
  );
};
const getDotorInforDotorById = (doctorId) => {
  return axios.get(
    `/api/get-profile-doctor-by-id?doctorId=${doctorId}`
  );
};
const postPatientBookAppointment = (data) => {
  return axios.post(
    `/api/patient-book-appoitntment`,data
  );
};
const postVerifyBookAppointment = (data) => {
  return axios.post(
    `/api/verify-book-appointment`,data
  );
};
const createNewSpecialty = (data) => {
  return axios.post(
    `/api/create-new-specialty`,data
  );
};
const getAllSpecialty = () => {
  return axios.get(
    `/api/get-all-specialty`
  );
};
export {
  handleLoginApi,
  getAllUser,
  createNewUserService,
  deleteUserService,
  editUserService,
  getAllCodeService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
  getScheduleDoctorByDate,
  getExtraInforDotorById,
  getDotorInforDotorById,
  postPatientBookAppointment,
  postVerifyBookAppointment,
  createNewSpecialty,
  getAllSpecialty
};
