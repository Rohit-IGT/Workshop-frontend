"use client";

import Loader from "@/app/components/Loader";
import { TWorkOrderData } from "@/app/types/work-order";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import WorkOrderTableContainer from "./WorkOrderTableContainer";
import { getPageWorkOrder } from "@/app/services/operations/workorder/workorder";
import { Button, DatePicker } from "antd";
import dayjs from "dayjs";
import { useAppSelector } from "@/app/store/reduxHooks";
import useAbility from "@/app/__hooks/useAbility";
import { casl_action, casl_subject } from "@/app/utils/casl/constant";
import { employeeRole } from "@/app/utils/constants/employee-roles";
import { useTranslations } from "next-intl";
const { RangePicker } = DatePicker;

type Props = {};

const WorkOrderPageContainer = (props: Props) => {
  const [workOrderLoading, setWorkOrderLoading] = useState(true);
  const [workOrderData, setWorkOrderData] = useState<TWorkOrderData>({
    workOrders: [],
    totalWorkOrders: 0,
  });
  const { authData } = useAppSelector((state) => state.auth);

  const t = useTranslations("EmployeeDashboardWorkOrderPage");

  const ability = useAbility();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (ability && ability.can(casl_action.get, casl_subject.workorder)) {
      loadWorkOrders();
    }
  }, [searchParams, router, ability]);

  const loadWorkOrders = async () => {
    try {
      setWorkOrderLoading(true);
      let queryString = searchParams.toString();
      if (
        authData.role === employeeRole.advisor ||
        authData.role === employeeRole.mechanic
      ) {
        queryString += `&userId=${authData._id}`;
      }
      const workOrderData = await getPageWorkOrder(queryString);
      if (workOrderData) {
        setWorkOrderData(workOrderData);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setWorkOrderLoading(false);
    }
  };

  // create query string
  const createQueryString = useCallback(
    (name: string, value?: string, url: string = searchParams.toString()) => {
      if (!value || value === "") return removeQueryParams(url, name);
      else return setQueryParams(url, name, value);
    },
    [searchParams],
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

  const handleClearFilter = () => {
    router.push(pathname);
  };

  const handleRangeSelect = (value: any) => {
    if (!value) return;
    // console.log(value);
    const startDate =
      value.length > 0
        ? dayjs(value[0]).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : new Date().toISOString();
    const endDate =
      value.length > 1
        ? dayjs(value[1]).format("YYYY-MM-DDTHH:mm:ss.SSS")
        : new Date().toISOString();

    // console.log(startDate, endDate);

    let querystring = createQueryString("startDate", startDate);
    querystring = createQueryString("endDate", endDate, querystring);
    router.push(`${pathname}?${querystring}`);
  };

  return (
    <div>
      {workOrderLoading ? (
        <div
          style={{ height: "calc(100vh - 300px)" }}
          className="flex justify-center items-center w-full"
        >
          <Loader />
        </div>
      ) : (
        <div>
          <div className="mb-4 flex justify-between">
            {searchParams.get("startDate") && searchParams.get("endDate") ? (
              <RangePicker
                onChange={handleRangeSelect}
                defaultValue={[
                  dayjs(searchParams.get("startDate")),
                  dayjs(searchParams.get("endDate")),
                ]}
              />
            ) : (
              <RangePicker onChange={handleRangeSelect} />
            )}
            <div>
              <Button type="primary" onClick={handleClearFilter}>
                {t("clear_filter")}
              </Button>
            </div>
          </div>

          <div className="shadow-xl rounded-xl">
            <WorkOrderTableContainer workOrderData={workOrderData.workOrders} />
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkOrderPageContainer;
