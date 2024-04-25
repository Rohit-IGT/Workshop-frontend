"use client";

import SelectField from '@/app/components/Input/SelectField';
import { useAppSelector } from '@/app/store/reduxHooks';
import { TServicePlans } from '@/app/types/service';
import { TworkorderPrepare } from '@/app/validators/workorder';
import { useEffect, useState } from 'react';
import { UseFormWatch } from 'react-hook-form';
import ServicePlanDetailContainer from '../../__components/ServicePlanDetailContainer';

type Props = {
    errors: any,
    setValue: any,
    watch: UseFormWatch<TworkorderPrepare>
}

const SelectServicePlanForWorkOrder = (props: Props) => {

    const servicePlansData = useAppSelector((state) => state.servicePlan.servicePlansData)
    const servicePlans: TServicePlans[] = Object.values(servicePlansData).flatMap(category => category.plans)
    console.log(servicePlans)

    const [servicePlanOptions, setServicePlanOptions] = useState<{ value: string, label: string }[]>([]);

    useEffect(() => {
        setServicePlanOptions((prv) => {
            return servicePlans.map((plan) => {
                const label = (typeof plan.category === "string") ? plan.name : `${plan.category.name} - ${plan.name}`
                return {
                    label,
                    value: plan._id
                }
            })
        })
    }, [servicePlans]);

    return (
        <div>
            <div className='md:w-1/2 mb-4'>
                <SelectField
                    mode={"multiple"}
                    name={"servicePlanId"}
                    placeholder={"Select Service Plans"}
                    error={props.errors["servicePlanId"] ? props.errors["servicePlanId"]?.message || "" : ""}
                    label={"Service Plan"}
                    setValue={props.setValue}
                    options={servicePlanOptions}
                    defaultValue={props.watch("servicePlanId")}
                />
            </div>
            <div className='grid grid-cols-2 gap-4'>
                {
                    props.watch("servicePlanId").map((planId) => {
                        return <ServicePlanDetailContainer key={planId} servicePlan={planId} />
                    })
                }

            </div>
        </div>

    )
}

export default SelectServicePlanForWorkOrder