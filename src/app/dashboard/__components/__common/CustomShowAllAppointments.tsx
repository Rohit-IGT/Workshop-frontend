'use client'
import Watermark from '@/app/components/Text/WatermarkText';
import { cancelAppointment, getAllCustomerAppointment } from '@/app/services/operations/appointment/appointment';
import { useAppDispatch, useAppSelector } from '@/app/store/reduxHooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppointmentData, fetchAppointments } from '../../appointment/__utils/FetchAppointments';
import AllAppointments from '../../appointment/__common/AllAppointment';

type Props = {
    pageType: 'reschedule' | 'previous' | 'cancelled'
}

const CustomShowAllAppointments: React.FC<Props> = ({pageType}) => {
    const [processedAppointmentData, setProcessedAppointmentData] = useState<AppointmentData[]>([]);
    const { appointmentLoading, appointmentData } = useAppSelector((state) => state.customerAppointment)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pageTitle =
        pageType === 'cancelled'
            ? 'Cancel Appointment'
            : pageType === 'previous'
            ? 'All Appointments'
            : 'Re-Schedule Appointment';

    const pageDetailsNotFound =
        pageType === 'previous'
            ? 'No Previous Appointments Found'
            : 'No Scheduled Appointments Found';

    useEffect(() => {
        if (appointmentLoading) {
            dispatch(getAllCustomerAppointment());
        }
    }, [appointmentLoading, dispatch]);

    useEffect(() => {
        const filteredAppointments: AppointmentData[] = pageType !== 'previous' ? fetchAppointments(appointmentData, 'Scheduled') : fetchAppointments(appointmentData);
        setProcessedAppointmentData(filteredAppointments)
    }, [appointmentData, pageType]);
    
    const handleRescheduleAppointment = (appointmentId: string) => {
        router.push('reschedule/'+appointmentId)
    };

    const handleShowAppointmentDetails = (appointmentId: string) => {
        router.push('/dashboard/appointment/'+appointmentId)
    };

    const handleCancelAppointment = async (appointmentId: string) => {
        await cancelAppointment(appointmentId)
        dispatch(getAllCustomerAppointment())
    };

    return (
        <>
        {
            appointmentLoading ? (<h1>LOADING</h1>) : (
                <div>
                    <h1 className='text-lg font-bold bg-white p-4'>{pageTitle}</h1>
                    <div className=' flex flex-col gap-4 my-4'>
                        {processedAppointmentData.length > 0 ? (
                            processedAppointmentData.map(appointment => (
                                <AllAppointments
                                    key={appointment.appointmentId}
                                    appointment={appointment}
                                    onRescheduleAppointment={(pageType === 'reschedule' || pageType === 'cancelled') ? handleRescheduleAppointment : undefined}                                    onShowAppointmentDetails={pageType === 'previous' ? handleShowAppointmentDetails : undefined}
                                    onCancelAppointment={pageType === 'cancelled' ? handleCancelAppointment : undefined}                                
                                />
                            ))
                        ) : (
                            <div><Watermark text={pageDetailsNotFound}/></div>
                        )}
                    </div>
                </div>
            )
        }
        </>
    );
};

export default CustomShowAllAppointments;