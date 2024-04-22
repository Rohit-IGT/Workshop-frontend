"use client"

import Loader from '@/app/components/Loader';
import { TWorkOrderData } from '@/app/types/work-order';
import { removeQueryParams, setQueryParams } from '@/app/utils/helper';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react'
import WorkOrderTableContainer from './WorkOrderTableContainer';
import { getAllWorkOrder } from '@/app/services/operations/workorder/workorder';

type Props = {}

const WorkOrderPageContainer = (props: Props) => {
    const [workOrderLoading, setWorkOrderLoading] = useState(true);
    const [workOrderData, setWorkOrderData] = useState<TWorkOrderData>({
        workOrders: [],
        totalWorkOrders: 0
    })

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    useEffect(() => {
        loadWorkOrders();
        console.log("fetching workorder");
    }, [searchParams, router]);

    const loadWorkOrders = async () => {
        setWorkOrderLoading(true);
        const workOrderData = await getAllWorkOrder(searchParams.toString())
        if (workOrderData) {
            console.log("workOrderData", workOrderData)
            setWorkOrderData(workOrderData)
        }
        setWorkOrderLoading(false);
    }

    // create query string
    const createQueryString = useCallback(
        (name: string, value?: string) => {
            if (!value || value === "")
                return removeQueryParams(searchParams.toString(), name);
            else return setQueryParams(searchParams.toString(), name, value);
        },
        [searchParams]
    );

    // get current page
    const getCurrentPage = useCallback(() => {
        return Number(searchParams.get("page")) || 1;
    }, [searchParams]);

    // handle page change
    const handlePageChange = (value: number) => {
        const queryParmas = createQueryString("page", String(value));
        router.push(`${pathname}?${queryParmas}`);
    };

    return (
        <div>
            {
                workOrderLoading ? <Loader /> : <div>
                    <WorkOrderTableContainer workOrderData={workOrderData.workOrders}/>
                </div>
            }
        </div>
    )
}

export default WorkOrderPageContainer;