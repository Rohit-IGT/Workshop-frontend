"use client";
import { getAvailableSlots } from "@/app/services/operations/appointment/slots";
import { useAppDispatch } from "@/app/store/reduxHooks";
import { setSlotData } from "@/app/store/slices/slotSlice";
import { TAvailbleSlots } from "@/app/types/slot";
import { useTranslations } from "next-intl";
import React, { useRef } from "react";

interface Props {
  selectedDate: string;
  scrollToSlotDetails?: () => void;
  customClasses: string;
}

const ShowSlots: React.FC<Props> = ({
  selectedDate,
  scrollToSlotDetails,
  customClasses,
}) => {
  const dispatch = useAppDispatch();
  const scrollToSlotDetailsRef = useRef(scrollToSlotDetails);
  const t = useTranslations("SlotSchedule");

  const handleClick = async () => {
    try {
      if (selectedDate !== "") {
        const parts = selectedDate.split("-");
        const formattedDate = `${parts[1]}-${parts[0]}-${parts[2]}`;
        const res = await getAvailableSlots(formattedDate);
        dispatch(setSlotData(res));
        scrollToSlotDetailsRef.current?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <button onClick={handleClick} className={`${customClasses}`}>
      {t("findButton")}
    </button>
  );
};

export default ShowSlots;
