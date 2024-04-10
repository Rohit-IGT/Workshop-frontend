import toast from "react-hot-toast";
import { apiOpenConnector } from "../../apiOpenConnector";
import { authEndpoints } from "../../apis";
import { apiConnector } from "../../apiConnector";
import { AppDispatch } from "@/app/store/store";
import { setAuthData } from "@/app/store/slices/authSlice";

const { EMPLOYEE_LOGIN_API, GET_EMPLOYEE_DATA_API } = authEndpoints;

export async function getEmployeeData(_id : string, dispatch : AppDispatch) {
  try{
    const result = await apiConnector({
      method: "GET",
      url: GET_EMPLOYEE_DATA_API+"/"+_id,
    })

    if(result.data.success){
      const {_id, fullName, contactNumber, email } = result.data.data  
      window.localStorage.setItem("authData", result?.data?.data);
      dispatch(setAuthData({_id,fullName,contactNumber,email}))
    }
  }catch(err){
    throw err
  }
}

export async function employeeLogin(email: string, password: string, dispatch : AppDispatch) {
  try {
    const authResult = await apiOpenConnector({
      method: "POST",
      url: EMPLOYEE_LOGIN_API,
      bodyData: {
        email,
        password,
      },
    });

    if (authResult?.data?.success) {
      // window.localStorage.setItem("accessToken", authResult?.data?.accessToken);
      await getEmployeeData(authResult.data.data._id, dispatch)
      toast.success("LOGIN SUCCESSFULL");
    }
  } catch (err) {
    toast.error("LOGIN FAILED");
    throw err;
  }
}
