'use client';

import BookAppointmentContainer from "./__components/BookAppointmentCalender";

type Props = {};

const page = (props: Props) => {

  return (
    <div className=' flex flex-col p-4 md:p-0 gap-4 pb-32 md:pb-4 overflow-auto py-24 md:py-4'>
      <h1 className=' text-lg font-bold'>Book Appointment</h1>
      <div>
        <BookAppointmentContainer />
      </div>
    </div>
  );
};

export default page;