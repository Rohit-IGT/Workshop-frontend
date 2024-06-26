"use client";
import Watermark from "@/app/components/Text/WatermarkText";
import {
  cancelAppointment,
  getAllCustomerAppointment,
} from "@/app/services/operations/appointment/appointment";
import { useAppDispatch, useAppSelector } from "@/app/store/reduxHooks";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  AppointmentData,
  fetchAppointments,
} from "../../appointment/__utils/FetchAppointments";
import AllAppointments from "../../appointment/__common/AllAppointment";
import Loader from "@/app/components/Loader";

type Props = {
  pageType: "reschedule" | "previous" | "cancelled";
};

const CustomShowAllAppointments: React.FC<Props> = ({ pageType }) => {
  const [processedAppointmentData, setProcessedAppointmentData] = useState<
    AppointmentData[]
  >([]);
  const { appointmentLoading, appointmentData } = useAppSelector(
    (state) => state.customerAppointment,
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const pageTitle =
    pageType === "cancelled"
      ? "Cancel Appointment"
      : pageType === "previous"
        ? "All Appointments"
        : "Re-Schedule Appointment";

  const pageDetailsNotFound =
    pageType === "previous"
      ? "No Previous Appointments Found"
      : "No Scheduled Appointments Found";

  useEffect(() => {
    if (appointmentLoading) {
      dispatch(getAllCustomerAppointment());
    }
  }, [appointmentLoading]);

  // console.log(appointmentData);

  useEffect(() => {
    const filteredAppointments: AppointmentData[] =
      pageType === "previous"
        ? fetchAppointments(appointmentData)
        : pageType === "cancelled"
          ? fetchAppointments(appointmentData, ["Scheduled", "Rescheduled"])
          : fetchAppointments(appointmentData, [
              "Scheduled",
              "Missed",
              "Rescheduled",
            ]);
    setProcessedAppointmentData(filteredAppointments);
  }, [appointmentData, pageType]);

  const handleRescheduleAppointment = (appointmentId: string) => {
    const path = pathname.split("/").slice(-1)[0];

    if (path === "previous-appointments")
      router.push("appointment/reschedule/" + appointmentId);
    else router.push("reschedule/" + appointmentId);
  };

  const handleShowAppointmentDetails = (appointmentId: string) => {
    router.push("/dashboard/appointment/" + appointmentId);
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    await cancelAppointment(appointmentId);
    dispatch(getAllCustomerAppointment());
  };

  return (
    <>
      {appointmentLoading ? (
        <div
          style={{ height: "calc(100vh - 200px)" }}
          className="flex justify-center items-center "
        >
          <Loader />
        </div>
      ) : (
        <>
          {processedAppointmentData?.length > 0 ? (
            <div className="p-4 pt-28 pb-32 md:p-0 min-h-screen sm:min-h-full">
              <h1 className="text-lg font-bold bg-white p-4 rounded-xl">
                {pageTitle}
              </h1>
              <div className="flex flex-col gap-6 my-4">
                {processedAppointmentData?.map((appointment) => (
                  <AllAppointments
                    key={appointment.appointmentId}
                    appointment={appointment}
                    onRescheduleAppointment={
                      pageType === "reschedule" ||
                      pageType === "cancelled" ||
                      appointment.status === "Missed"
                        ? handleRescheduleAppointment
                        : undefined
                    }
                    onShowAppointmentDetails={
                      pageType === "previous"
                        ? handleShowAppointmentDetails
                        : undefined
                    }
                    onCancelAppointment={
                      pageType === "cancelled"
                        ? handleCancelAppointment
                        : undefined
                    }
                  />
                ))}
              </div>
            </div>
          ) : (
            <div style={{ height: "calc(100vh - 200px)" }} className="relative">
              <Watermark text={pageDetailsNotFound} />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CustomShowAllAppointments;
