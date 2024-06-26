"use client";
import {
  getAppointmentByAppointmentId,
  getAppointmentStatus,
} from "@/app/services/operations/appointment/appointment";
import {
  TAppointment,
  TAppointmentWorkOrderStatus,
} from "@/app/types/appointment";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Typography } from "antd";
import { appointmentNotification } from "@/app/services/operations/notification/appointment";
import AppointmentDetails from "@/app/components/Appointment/AppointmentDetails";
import Loader from "@/app/components/Loader";

interface Props {
  params: {
    appointmentId: string;
  };
}

const AppointmentPage: React.FC<Props> = ({ params }) => {
  const [appointmentData, setAppointmentData] = useState<TAppointment | null>(
    null,
  );
  const [status, setStatus] = useState<TAppointmentWorkOrderStatus | null>(
    null,
  );
  const [notificationData, setNotificationData] = useState({});
  const router = useRouter();

  const getAppointmentStatusData = async (id: string) => {
    const initAppointmentStatus = await getAppointmentStatus(id);
    setStatus(initAppointmentStatus);
  };

  const fetchAppointmentData = async () => {
    try {
      const result = await getAppointmentByAppointmentId(params.appointmentId);
      setAppointmentData(result);
    } catch (err) {
      // Handle error
    }
  };

  const initData = async () => {
    try {
      if (!params.appointmentId) return;

      const initNotificationData = await appointmentNotification(
        params.appointmentId,
      );
      await getAppointmentStatusData(params.appointmentId);
      setNotificationData(initNotificationData);
    } catch (err) {}
  };

  useEffect(() => {
    if (!appointmentData) fetchAppointmentData();

    const timeoutId = setTimeout(() => {
      initData();
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [params.appointmentId]);

  return (
    <div className="p-4 pt-28 pb-32 md:p-0">
      <Button onClick={() => router.back()} className="mb-4 w-fit">
        Back
      </Button>
      {appointmentData ? (
        <>
          <div className="flex justify-between items-center bg-white p-4 rounded-xl mb-8">
            <Typography.Title level={2} className="text-lg font-bold">
              Appointment Details
            </Typography.Title>

            {appointmentData?.status === "Completed" && (
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/appointment/${params?.appointmentId}/workorder`,
                  )
                }
              >
                Work Orders
              </Button>
            )}
          </div>
          <AppointmentDetails
            appointmentData={appointmentData}
            notificationData={notificationData}
            status={status}
            bordered
          />
        </>
      ) : (
        <div
          style={{ height: "calc(100vh - 300px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      )}
    </div>
  );
};

export default AppointmentPage;
