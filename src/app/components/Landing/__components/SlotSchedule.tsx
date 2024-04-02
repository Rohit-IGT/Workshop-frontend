'use client'
import React, { useState } from 'react';
import DatePicker from './DatePicker';
import ShowSlots from './ShowSlots';

interface Props {
  scrollToSlotDetails : () => void
}

const SlotSchedule: React.FC<Props> = ({scrollToSlotDetails}) => {
  // State for selected date
  const [selectedDate, setSelectedDate] = useState<string>('');

  return (
    <div className="relative h-[550px]">
      {/* Background image */}
      <div className="absolute inset-0 bg-cover bg-center filter blur-[5px]" style={{ backgroundImage: "url('/images/auth-side-img.jpg')" }}></div>
      
      {/* Content */}
      <div className="relative z-10 flex justify-center items-center h-full flex-col gap-14">
        {/* Title */}
        <h1 className="text-5xl font-extrabold text-customGray ">Welcome to Appviser</h1>
        
        {/* Date Picker and Slots Display */}
        <div className="flex w-[550px]">
          <DatePicker setSelectedDate={setSelectedDate} />
          <ShowSlots selectedDate={selectedDate} scrollToSlotDetails={scrollToSlotDetails} />
        </div>
      </div>
    </div>
  );
};

export default SlotSchedule;
