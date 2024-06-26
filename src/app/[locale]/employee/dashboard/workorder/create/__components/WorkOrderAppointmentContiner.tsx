import AppointmentDetails from "@/app/components/Appointment/AppointmentDetails";
import Loader from "@/app/components/Loader";
import { getAppointmentByAppointmentId } from "@/app/services/operations/appointment/appointment";
import { TAppointment } from "@/app/types/appointment";
import { TworkOrderCreate } from "@/app/validators/workorder";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { appointmentStatusEnum } from "../../../appointment/__utils/appointmentStatus";

type Props = {
  appointmentId: string | undefined;
  setWorkOrderCreateData: React.Dispatch<
    React.SetStateAction<TworkOrderCreate>
  >;
};

const WorkOrderAppointmentContiner = (props: Props) => {
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState<TAppointment | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (props.appointmentId) {
      setLoading(true);

      (async function () {
        try {
          const required_appointment = await getAppointmentByAppointmentId(
            props.appointmentId ? props.appointmentId : "",
          );
          if (
            required_appointment.status === appointmentStatusEnum.SCHEDULED ||
            required_appointment.status === appointmentStatusEnum.RESCHEDULED
          ) {
            setAppointment(required_appointment);
          } else if (required_appointment.status === "Completed") {
            router.push(
              "/employee/dashboard/workorder?appointmentId=" +
                props.appointmentId,
            );
          }
        } catch (err) {
          console.log(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [props.appointmentId]);

  /*
    setting up the appointmentId
    */
  useEffect(() => {
    if (appointment) {
      props.setWorkOrderCreateData((prv) => {
        return {
          ...prv,
          appointmentId: appointment._id,
        };
      });
    }
  }, [appointment]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center h-full w-full">
          <Loader />
        </div>
      ) : (
        <div>
          {appointment ? (
            <AppointmentDetails appointmentData={appointment} />
          ) : (
            <>No Scheduled Appointment Found</>
          )}
        </div>
      )}
    </div>
  );
};

export default WorkOrderAppointmentContiner;
