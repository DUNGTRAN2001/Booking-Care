import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
} from "../../services/userService";

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
      console.log("check create user redux", res);
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
      } else {
        dispatch(saveUserFail());
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
