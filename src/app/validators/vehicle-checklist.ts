import * as Yup from "yup";
import { vehicleChecklistStatusEnum } from "../utils/constants/checklistenum";

export const vehicleCheckListCreateYupSchema = Yup.object({
  vehicle: Yup.object({
    type: Yup.string().required(),
    brand: Yup.string().optional(),
    model: Yup.string().optional(),
    year: Yup.number().optional(),
  }),
  checklist: Yup.array(
    Yup.object({
      level: Yup.number().required("Level is required."),
      categories: Yup.array(
        Yup.object({
          name: Yup.string().required("Category Name is required."),
          tasks: Yup.array(
            Yup.object({
              name: Yup.string().required("Task Name is required."),
              // status: Yup.string(),
            }),
          ).default([]),
        }),
      ).default([]),
    }),
  ).default([]),
});

export type TvehicleCheckListCreateYupSchema = Yup.InferType<
  typeof vehicleCheckListCreateYupSchema
>;
