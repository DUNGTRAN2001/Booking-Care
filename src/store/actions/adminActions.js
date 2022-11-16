import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUser,
  deleteUserService,
  editUserService,
  getTopDoctorHomeService,
  getAllDoctors,
  saveDetailDoctor,
  getDetailInforDoctor,
  saveBulkScheduleDoctor,
} from "../../services/userService";
import { toast } from "react-toastify";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,
// });

export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFail());
      }
    } catch (error) {
      dispatch(fetchGenderFail());
      console.log("fetchGenderStart:", error);
    }
  };
};
export const fetchPositonStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFail());
      }
    } catch (error) {
      dispatch(fetchPositionFail());
      console.log("fetchPositionStart:", error);
    }
  };
};
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFail());
      }
    } catch (error) {
      dispatch(fetchRoleFail());
      console.log("fetchRoleStart:", error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFail = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFail = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFail = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      if (res && res.errCode === 0) {
        toast.success("Create a new user success!");
        dispatch(saveUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFail());
        toast.error(res.errMessage);
      }
    } catch (error) {
      dispatch(saveUserFail());
      console.log(error);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFail = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUser("ALL");
      if (res && res.errCode === 0) {
        // sort lại
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        dispatch(fetchAllUsersFail());
      }
    } catch (error) {
      dispatch(fetchAllUsersFail());
      console.log("fetchAllUsersStart:", error);
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USERS_SUCCESS,
  users: data,
});

export const fetchAllUsersFail = () => ({
  type: actionTypes.FETCH_ALL_USERS_FAILED,
});

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        toast.success("Delete the user success!");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.success("Delete the user error!");
        dispatch(deleteUserFail());
      }
    } catch (error) {
      dispatch(deleteUserFail());
      console.log("deleteUserFail:", error);
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});

export const deleteUserFail = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});

export const eidtAUser = (user) => {
  return async (dispatch, getState) => {
    try {
      let res = await editUserService(user);
      if (res && res.errCode === 0) {
        toast.success("Edit the user success!");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.success("Edit the user error!");
        dispatch(editUserFail());
      }
    } catch (error) {
      dispatch(editUserFail());
      console.log("editUserFail:", error);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});

export const editUserFail = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});

export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getTopDoctorHomeService("6");
      if (res && res.errCode === 0) {
        dispatch(fetchTopDoctorSuccess(res.data));
      } else {
        dispatch(fetchTopDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchTopDoctorFailed());
      console.log("fetchTopDoctorFailed:", error);
    }
  };
};

export const fetchTopDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
  dataDoctors: data,
});

export const fetchTopDoctorFailed = () => ({
  type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
});

export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllDoctors();
      if (res && res.errCode === 0) {
        dispatch(fetchAllDoctorSuccess(res.data));
      } else {
        dispatch(fetchAllDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchAllDoctorFailed());
      console.log("fetchAllDoctorFailed:", error);
    }
  };
};

export const fetchAllDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
  dataDr: data,
});

export const fetchAllDoctorFailed = () => ({
  type: actionTypes.FETCH_ALL_DOCTORS_FAILED,
});

export const saveDetailInforDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveDetailDoctor(data);
      console.log("check tt ", res);
      if (res && res.errCode === 0) {
        console.log("oke");
        toast.success("Save infor detail doctor success!");
        dispatch(saveDetailDoctorSuccess());
      } else {
        toast.error("Save infor detail doctor fail!");
        dispatch(saveDetailDoctorFailed());
      }
    } catch (error) {
      dispatch(saveDetailDoctorFailed());
      console.log("saveDetailDoctorFailed:", error);
    }
  };
};

export const saveDetailDoctorSuccess = (data) => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
});

export const saveDetailDoctorFailed = () => ({
  type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
});

export const fetchDetailDoctor = (doctorId) => {
  return async (dispatch, getState) => {
    try {
      let res = await getDetailInforDoctor(doctorId);
      if (res && res.errCode === 0) {
        dispatch(fetchDetailDoctorSuccess(res.data));
      } else {
        dispatch(fetchDetailDoctorFailed());
      }
    } catch (error) {
      dispatch(fetchDetailDoctorFailed());
      console.log("fetchDetailDoctorFailed:", error);
    }
  };
};

export const fetchDetailDoctorSuccess = (data) => ({
  type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
  dataDoctorById: data,
});

export const fetchDetailDoctorFailed = () => ({
  type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
});

export const fetchAllScheduleTime = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("TIME");
      if (res && res.errCode === 0) {
        dispatch(fetchAllcodeScheduleSuccess(res.data));
      } else {
        dispatch(fetchAllcodeScheduleSuccess());
      }
    } catch (error) {
      dispatch(fetchAllcodeScheduleFailed());
      console.log("fetchAllcodeScheduleFailed:", error);
    }
  };
};

export const fetchAllcodeScheduleSuccess = (data) => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
  data: data,
});

export const fetchAllcodeScheduleFailed = () => ({
  type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED,
});

export const createBulkScheduleDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await saveBulkScheduleDoctor(data);
      if (res && res.errCode === 0) {
        // toast.success("Create a new user success!");
        dispatch(saveBulkScheduleDoctorSuccess());
      } else {
        dispatch(saveBulkScheduleDoctorFail());
        // toast.error(res.errMessage);
      }
    } catch (error) {
      dispatch(saveBulkScheduleDoctorFail());
      console.log("saveBulkScheduleDoctorFail:", error);
    }
  };
};

export const saveBulkScheduleDoctorSuccess = () => ({
  type: actionTypes.CREATE_BULK_SCHEDULE_DOCTOR_SUCCESS,
});
export const saveBulkScheduleDoctorFail = () => ({
  type: actionTypes.CREATE_BULK_SCHEDULE_DOCTOR_FAILED,
});
