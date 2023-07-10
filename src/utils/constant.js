export const path = {
  HOME: "/",
  HOMEPAGE: "/home",
  LOGIN: "/login",
  LOG_OUT: "/logout",
  SYSTEM: "/system",
  DETAIL_DOCTOR: "/detail-doctor/:id",
  VERIFY_EMAIL_BOOKING: "/verify-booking",
  DETAIL_SPECIALTY: "/detail-specialty/:id",
  DETAIL_CLINIC: "/detail-clinic/:id",
  DETAIL_HANBOOK : "/detail-handbook/:id",
  ALL_DOCTOR: "/all-doctor",
  ALL_SPECIALTY : '/all-specialty',
  ALL_CLINIC : '/all-clinic',
  ALL_HANDBOOK : '/all-handbook',
};

export const LANGUAGES = {
  VI: "vi",
  EN: "en",
};

export const CRUD_ACTIONS = {
  CREATE: "CREATE",
  EDIT: "EDIT",
  DELETE: "DELETE",
  READ: "READ",
};

export const dateFormat = {
  SEND_TO_SERVER: "DD/MM/YYYY",
};

export const YesNoObj = {
  YES: "Y",
  NO: "N",
};
export const USER_ROLE = {
  ADMIN: "R1",
  DOCTOR: "R2",
  PATIENT: "R3",
};
export const USE_WAY_MEDICAL =[
    {
      label : 'Sáng 1 tối 1',
      value : 1
    },
    {
      label : 'Sáng 2 tối 2',
      value : 2
    },
    {
      label : 'Sáng 1',
      value : 1
    },
    {
      label : 'Tối 1',
      value : 1
    },
    {
      label : 'Sáng 2',
      value : 1
    },
    {
      label : 'Tối 2',
      value : 1
    }
  ]
export const TYPE_MEDICAL = [
  {
    label : 'Viên',
    value : 1,
  },
  {
    label : 'Gói',
    value : 2
  }
]