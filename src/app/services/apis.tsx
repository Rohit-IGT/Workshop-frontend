// const BASE_URL = process.env.REACT_APP_BASE_URL
const AUTH_BASE_URL = "http://localhost:4000";
const APPOINTMENT_SERVICE_BASE_URL = "http://localhost:5000/api";
const WORK_ORDER_SERVICE_BASE_URL = "http://localhost:4100/api"

const CUSTOMER = '/customer'
const AUTH = '/auth'
const EMPLOYEE = '/employee'
const SLOT_SCHEDULE = '/slot_schedule'
const SLOTS = '/slots'
const CALENDER = "/calender";
const APPOINTMENT = "/appointment"
const VEHICLE = "/vehicle";
const CANCEL = "/cancel";

const CUSTOMER_AUTH_BASE_URL = AUTH_BASE_URL + CUSTOMER
const EMPLOYEE_AUTH_BASE_URL = AUTH_BASE_URL + EMPLOYEE
const AUTHENTICATION_BASE_URL = AUTH_BASE_URL + AUTH
const APPOINTMENT_SLOT_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + SLOTS

const APPOINTMENT_SLOT_SCHEDULE_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + SLOT_SCHEDULE;
const APPOINTMENT_CALENDER_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + CALENDER;
const APPOINTMENT_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + APPOINTMENT
const APPOINTMENT_VEHICLE_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + VEHICLE;
const APPOINTMENT_CANCEL_BASE_URL = APPOINTMENT_SERVICE_BASE_URL + APPOINTMENT + CANCEL;

// AUTH ENDPOINTS
export const authEndpoints = {
  SENDOTP_API: CUSTOMER_AUTH_BASE_URL + "/sendOtp",
  VERIFYOTP_API: CUSTOMER_AUTH_BASE_URL + "/verifyOtp",
  AUTH_API: CUSTOMER_AUTH_BASE_URL + "/auth",
  GENERATE_ACCESS_TOKEN_API: AUTHENTICATION_BASE_URL + "/generateAccessToken",
  EMPLOYEE_LOGIN_API: EMPLOYEE_AUTH_BASE_URL + "/login",
  GET_CUSTOMER_DATA_API: CUSTOMER_AUTH_BASE_URL,
  GET_EMPLOYEE_DATA_API: EMPLOYEE_AUTH_BASE_URL,
  LOGOUT_API: AUTHENTICATION_BASE_URL + '/logout',
  CUSTOMER_UPDATE_API: CUSTOMER_AUTH_BASE_URL + '/update'
};

export const appointmentEndpoints = {
  // SLOT_SCHEDULE
  CREATE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/create",
  GET_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/get-by-id",
  GET_ALL_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/get-all",
  UPDATE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/update",
  DELETE_SLOT_SCHEDULE_API: APPOINTMENT_SLOT_SCHEDULE_BASE_URL + "/delete",

  // SLOT AVAILABILITY
  GET_AVAILABLE_SLOTS_API: APPOINTMENT_SLOT_BASE_URL + '/get-available',

  // CALENDER
  GET_ALL_CALENDER: APPOINTMENT_CALENDER_BASE_URL + "/get-all",
  CREATE_CALENDER: APPOINTMENT_CALENDER_BASE_URL + "/create",
  UPDATE_CALENDER_STATUS: APPOINTMENT_CALENDER_BASE_URL + "/update-status",

  // APPOINTMENT
  GET_APPOINTMENT_BY_CALENDER: APPOINTMENT_BASE_URL + "/get-by-calender",
  GET_APPOINTMENT_BY_APPOINTMENT_ID: APPOINTMENT_BASE_URL + "/get",
  GET_ALL_APPOINTMENT: APPOINTMENT_BASE_URL + "/get-all",
  GET_APPOINTMENT_BOOK_INIT_DATA: APPOINTMENT_BASE_URL + "/book/init",
  APPOINTMENT_BOOK: APPOINTMENT_BASE_URL + "/book",
  APPOINTMENT_CANCEL_API: APPOINTMENT_CANCEL_BASE_URL,
  APPOINTMENT_RESCHEDULE_API: APPOINTMENT_BASE_URL + '/reschedule',
  GET_ALL_CUSTOMER_APPOINTMENT: APPOINTMENT_BASE_URL + '/get-by-customer',

  // VEHICLE 
  GET_VEHICLE: APPOINTMENT_VEHICLE_BASE_URL + "/get",
  CREATE_VEHICLE: APPOINTMENT_VEHICLE_BASE_URL + "/create",
  GET_VEHICLE_BY_CUSTOMER_ID: APPOINTMENT_VEHICLE_BASE_URL + '/get-by-customer',
  UPDATE_VEHICLE_BY_CUSTOMER_ID: APPOINTMENT_VEHICLE_BASE_URL + '/update',
  DELETE_VEHICLE_BY_CUSTOMER_ID: APPOINTMENT_VEHICLE_BASE_URL + '/delete'
};


export const workOrderEndPoints = {
  GET_EMPLOYEE_WORK_STATUS: WORK_ORDER_SERVICE_BASE_URL + "/employee/status",
  CREATE_WORK_ORDER : WORK_ORDER_SERVICE_BASE_URL +"/workorder/create",
  GET_ALL_WORK_ORDER : WORK_ORDER_SERVICE_BASE_URL + "/workorder/get-all"
}