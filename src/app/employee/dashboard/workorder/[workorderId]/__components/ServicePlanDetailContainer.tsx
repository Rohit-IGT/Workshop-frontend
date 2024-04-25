"use client"

import { useAppSelector } from '@/app/store/reduxHooks';
import { TServicePlans } from '@/app/types/service';
import { Descriptions, Typography } from 'antd';
import { useEffect, useState } from 'react';


const { Text } = Typography

type Props = {
    servicePlan: TServicePlans | string
}

const ServicePlanDetailContainer = (props: Props) => {
    const servicePlans = useAppSelector((state) => state.servicePlan.servicePlansData)

    const [servicePlan, setServicePlan] = useState<TServicePlans | null | undefined>(null);

    useEffect(() => {
        setServicePlan(() => {
            if (typeof props.servicePlan === "string") {
                return servicePlans.find((el) => {
                    return props.servicePlan === el._id
                })
            }
            return props.servicePlan;
        })
    }, [props.servicePlan]);



    return (

        <>
            {
                servicePlan ? <div className='border rounded-md p-2 mb-2'>
                    <Descriptions column={2}>
                        <Descriptions.Item label="Name">{servicePlan.name}</Descriptions.Item>
                        <Descriptions.Item label="Category">{(typeof servicePlan.category !== "string") ?
                            servicePlan.category.name : "-"}</Descriptions.Item>
                        <Descriptions.Item label="Price">
                            {servicePlan.price}
                        </Descriptions.Item>
                    </Descriptions>
                    <div className='w-full grid grid-cols-2 gap-2'>
                        <div>
                            <h2 className='mb-2 font-semibold'>Descriptions</h2>
                            <ul>
                                {
                                    servicePlan.description?.map((el, index) => {
                                        return <li key={index} className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>
                                            <p>{(typeof el === "string") && el}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div>
                            <h2 className='mb-2 font-semibold'>Taks</h2>
                            <ul>
                                {
                                    servicePlan.tasks?.map((el, index) => {
                                        return <li key={index} className='relative flex items-center gap-4 ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'>
                                            <p>{(typeof el !== "string") && el.name}</p>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div> : <Text>Service Plan Not Found</Text>
            }
        </>
    )
}

export default ServicePlanDetailContainer