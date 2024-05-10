"use client";
import { vehicleCreateInputFields } from "@/app/[locale]/employee/dashboard/appointment/book/__utils/vehicle-create-input";
import InputField from "@/app/components/Input/InputField";
import { updateVehicle } from "@/app/services/operations/appointment/vehicle";
import { useAppDispatch } from "@/app/store/reduxHooks";
import { setVehicleLoading } from "@/app/store/slices/customerVehicleSlice";
import { COMMON_ERROR } from "@/app/utils/constants/constant";
import {
  TvehicleCreateSchema,
  vehicleCreateSchema,
} from "@/app/validators/vehicle";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "antd";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Props = {
  updateVehicleId: string;
  setUpdateVehicleId: React.Dispatch<React.SetStateAction<string>>;
  updateVehicleValues: TvehicleCreateSchema;
};

const VehicleUpdateContainer = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: props.updateVehicleValues,
    resolver: yupResolver(vehicleCreateSchema),
  });

  const onSubmit = async (data: TvehicleCreateSchema) => {
    setLoading(true);
    try {
      await updateVehicle(props.updateVehicleId, data);
    } catch (err: any) {
      // console.log(err);
      toast.error(err?.response?.data?.message || COMMON_ERROR);
    } finally {
      setLoading(false);
      props.setUpdateVehicleId("");
      dispatch(setVehicleLoading(true));
    }
  };

  const handleBack = () => {
    props.setUpdateVehicleId("");
  };
  return (
    <div className="w-full">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {vehicleCreateInputFields.map((field, index) => {
          return (
            <InputField
              key={index}
              name={field.name}
              label={field.label}
              type={field.type}
              placeholder={field.placeholder}
              control={control}
              error={
                errors[field.name as keyof TvehicleCreateSchema]
                  ? errors[field.name as keyof TvehicleCreateSchema]?.message ||
                    ""
                  : ""
              }
            />
          );
        })}
      </div>
      <div className="mt-4 flex justify-start gap-4">
        <Button disabled={loading} onClick={handleBack}>
          Back
        </Button>
        <Button
          type="primary"
          disabled={loading}
          onClick={handleSubmit(onSubmit)}
          className="text-white"
        >
          Update
        </Button>
      </div>
    </div>
  );
};

export default VehicleUpdateContainer;