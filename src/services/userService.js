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
const getAllSpecialty = (limit) => {
  return axios.get(
    `/api/get-all-specialty?limit=${limit}`
  );
};
const getDetailSpecialtyById= (data) => {
  return axios.get(
    `/api/get-detail-specialty-by-id?id=${data?.id}&location=${data.location}`
  );
};
const createClinic = (data) => {
  return axios.post(
    `/api/create-new-clinic`,data
  );
};
const getAllClinic = (limit) => {
  return axios.get(
    `/api/get-all-clinic?limit=${limit}`
  );
};
const getDetailClinicById= (id) => {
  return axios.get(
    `/api/get-detail-clinic-by-id?id=${id?.id}`
  );
};
const getAllPatientForDoctor= (data) => {
  return axios.get(
    `/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`
  );
};
const postSendRedemy = (data)=>{
  return axios.post(
    `/api/send-redemy`,data
  );
}
const deleteSpecialty = (id) => {
  //đúng chuẩn axios
  return axios.delete("/api/delete-specialty", {
    data: {
      id: id,
    },
  });
};
const editSpecialtyService = (inputData) => {
  return axios.put("/api/edit-specialty", inputData);
};
const deleteClinic= (id) => {
  //đúng chuẩn axios
  return axios.delete("/api/delete-clinic", {
    data: {
      id: id,
    },
  });
};
const editSClinicService = (inputData) => {
  return axios.put("/api/edit-clinic", inputData);
};

const createNewHandbook = (data) => {
  return axios.post(
    `/api/create-new-handbok`,data
  );
};
const getAllHandBook = (limit) => {
  return axios.get(
    `/api/get-all-handbook?limit=${limit}`
  );
};
const getDetailHandBookById= (id) => {
  return axios.get(
    `/api/get-detail-handbook-by-id?id=${id}`
  );
};
const deleteHandbook= (id) => {
  return axios.delete("/api/delete-handbook", {
    data: {
      id: id,
    },
  });
};
const editHandbookService = (inputData) => {
  return axios.put("/api/edit-handbook", inputData);
};


const createNewMedication = (data) => {
  return axios.post(
    `/api/create-new-medication`,data
  );
};
const getAllMedication = () => {
  return axios.get(
    `/api/get-all-medication`
  );
};
const deleteMedication= (id) => {
  return axios.delete("/api/delete-medication", {
    data: {
      id: id,
    },
  });
};
const editMedicationService = (inputData) => {
  return axios.put("/api/edit-medication", inputData);
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
  getAllSpecialty,
  getDetailSpecialtyById,
  createClinic,
  getAllClinic,
  getDetailClinicById,
  getAllPatientForDoctor,
  postSendRedemy,
  deleteSpecialty,
  editSpecialtyService,
  deleteClinic,
  editSClinicService,
  createNewHandbook,
  getAllHandBook,
  getDetailHandBookById,
  deleteHandbook,
  editHandbookService,
  createNewMedication,
  getAllMedication,
  deleteMedication,
  editMedicationService
};
