import DescriptionItem from '@/app/components/DescriptionItem.tsx';
import { TRamp } from '@/app/types/ramp';
import { Typography } from 'antd';
import React from 'react';
import WorkOrderManageRampDrawer from './WorkOrderManageRampDrawer';
import { TWorkOrder } from '@/app/types/work-order';
import Watermark from '@/app/components/Text/WatermarkText';

const { Title, Text } = Typography;


type Props = {
    ramp: string | TRamp | null;
    handleUpdateWorkOrderData: (field: keyof TWorkOrder, fieldData: any) => void;
};

const WorkOrderRampDetails = (props: Props) => {
    return (
        <div className='w-full'>
            <div className='flex justify-between'>
                <Title level={5}>
                    Ramp Details
                </Title>
                <WorkOrderManageRampDrawer ramp={props.ramp} handleUpdateWorkOrderData={props.handleUpdateWorkOrderData} />
            </div>
            {
                props.ramp ? <div className='flex flex-wrap justify-between items-center'>
                    <div className="w-1/2">
                        <h3 className='font-semibold'>Ramp</h3>
                        <p>{(typeof props.ramp !== "string") ? props.ramp.name : "-"}</p>
                    </div>
                    <div className="w-1/2">
                        <h3 className='font-semibold'>Location</h3>
                        <p>{(typeof props.ramp !== "string") ? props.ramp.location : "-"}</p>
                    </div>

                    {/* <DescriptionItem title='Name' content={(typeof props.ramp !== "string") ? props.ramp.name : "-"} />
                    <DescriptionItem title='Location' content={(typeof props.ramp !== "string") ? props.ramp.location : "-"} /> */}
                </div> : <div className="relative py-8">
                    <Watermark text='No Ramp Assigned' />
                </div>
            }

        </div>
    );
};

export default WorkOrderRampDetails;