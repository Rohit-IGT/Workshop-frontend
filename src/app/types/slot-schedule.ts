import { NEW_SLOT_SCHEDULE } from "../employee/dashboard/slot-management/slot-schedule/__utils/constant";

export type TSlotTime = {
  hour: number;
  minute: number;
  second?: number;
};

export type TSlotDetail = {
  start_time: TSlotTime;
  end_time: TSlotTime;
  slot_limit: number;
};

export type TSlotSchedule = {
  name: string;
  slot_details: TSlotDetail[];
};


export type TActiveSlotSchedule = TSlotSchedule | null | typeof NEW_SLOT_SCHEDULE