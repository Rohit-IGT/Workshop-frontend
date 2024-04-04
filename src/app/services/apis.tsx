// const BASE_URL = process.env.REACT_APP_BASE_URL
const AUTH_BASE_URL = "http://localhost:4000";
const APPOINTMENT_BASE_URL = "http://localhost:5000/api";

const CUSTOMER = '/customer'
const AUTH = '/auth'
const EMPLOYEE = '/employee'
const SLOT_SCHEDULE = '/slot-schedule'
const SLOTS = '/slots'
const CALENDER = "/calender";

const CUSTOMER_AUTH_BASE_URL = AUTH_BASE_URL + CUSTOMER
const EMPLOYEE_AUTH_BASE_URL = AUTH_BASE_URL + EMPLOYEE 
const AUTHENTICATION_BASE_URL = AUTH_BASE_URL + AUTH
const APPOINTMENT_SLOT_BASE_URL = APPOINTMENT_BASE_URL + SLOTS

const APPOINTMENT_SLOT_SCHEDULE_BASE_URL = APPOINTMENT_BASE_URL + SLOT_SCHEDULE;
const APPOINTMENT_CALENDER_BASE_URL = APPOINTMENT_BASE_URL + CALENDER;

// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: CUSTOMER_AUTH_BASE_URL + "/sendOtp",
  VERIFYOTP_API: CUSTOMER_AUTH_BASE_URL + "/verifyOtp",
  AUTH_API: CUSTOMER_AUTH_BASE_URL + "/auth",
  GENERATE_ACCESS_TOKEN_API: AUTHENTICATION_BASE_URL + "/generateAccessToken",
  EMPLOYEE_LOGIN_API: EMPLOYEE_AUTH_BASE_URL + "/login",
  GET_CUSTOMER_DATA_API: CUSTOMER_AUTH_BASE_URL,
  GET_EMPLOYEE_DATA_API: EMPLOYEE_AUTH_BASE_URL
};

export const appointmentEndpoints = {
  // SLOT_SCHEDULE
  CREATE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/create",
  GET_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/get-by-id",
  GET_ALL_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/get-all",
  UPDATE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/update",
  DELETE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/delete",

    // SLOT AVAILABILITY
    GET_AVAILABLE_SLOTS_API : APPOINTMENT_SLOT_BASE_URL + '/get-available',
  // CALENDER
    GET_ALL_CALENDER: APPOINTMENT_CALENDER_BASE_URL + "/get-all",
};
