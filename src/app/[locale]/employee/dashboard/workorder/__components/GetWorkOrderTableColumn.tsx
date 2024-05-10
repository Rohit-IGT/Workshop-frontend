"use client";
import React, { useCallback } from "react";
// import GetColumnTextSearchProps from "@/app/components/TableSearch/getColumnTextSearchProps";
import GetColumnTextSearchProps from "@/app/components/TableSearch/GetColumnTextSearchProps";
import {
  Button,
  Flex,
  Radio,
  RadioChangeEvent,
  Space,
  TableProps,
  Typography,
} from "antd";
// import { workOrderStatusText } from "../__utils/workOrderStatus";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FilterDropdownProps } from "antd/es/table/interface";
import { removeQueryParams, setQueryParams } from "@/app/utils/helper";
import { FaEye } from "react-icons/fa";
import { MdAddChart } from "react-icons/md";
import {
  TWorkOrder,
  TWorkOrderDataTable,
  TWorkOrderStatus,
} from "@/app/types/work-order";
import { getWorkOrderStatus } from "../__utils/workOrderStatus";
import { appointmentStatusText } from "../../appointment/__utils/appointmentStatus";
import { TAppointmentStatus } from "@/app/types/appointment";
import dayjs from "dayjs";
import { IoIosEye } from "react-icons/io";

const { Title, Text } = Typography;

export function GetWorkOrderTableColumn() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      if (!value || value === "")
        return removeQueryParams(searchParams.toString(), name);
      else return setQueryParams(searchParams.toString(), name, value);
    },
    [searchParams],
  );

  // select status
  const handleStatusSelect = (
    e: RadioChangeEvent,
    props: FilterDropdownProps,
  ) => {
    const queryParmas = createQueryString(
      e.target.name || "status",
      e.target.value,
    );
    router.push(`${pathname}?${queryParmas}`);
    props.close();
  };

  // reset status
  const handleStatusReset = () => {
    const queryParmas = createQueryString("status");
    router.push(`${pathname}?${queryParmas}`);
  };

  const column_work_data_table: TableProps<TWorkOrderDataTable>["columns"] = [
    {
      title: "Order Number",
      dataIndex: "orderNumber",
      key: "orderNumber",
      ...GetColumnTextSearchProps<TWorkOrderDataTable>("orderNumber"),
      render: (orderNumber) => {
        return (
          <div className="font-semibold">
            {/* <Title level={5}>{orderNumber}</Title> */}
            {orderNumber}
          </div>
        );
      },
    },
    {
      title: "Vehicle Reg No.",
      dataIndex: "vehicle_registeration_number",
      key: "vehicle_registeration_number",
      ...GetColumnTextSearchProps<TWorkOrderDataTable>("registeration_number"),
      render: (register) => {
        return <p className="uppercase">{register}</p>;
      },
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      defaultSortOrder: "descend",
      // sorter: (a, b) => a.date_time.getTime() - b.date_time.getTime(),
      render: (value) => {
        return (
          <div className="flex flex-wrap items-center gap-3">
            <Text>{dayjs(value).format("DD/MMM/YYYY")}</Text>

            <Text>{dayjs(value).format("h:mm A")}</Text>
          </div>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: getWorkOrderStatus(),
      filterDropdown: (props) => {
        return (
          <div className="p-4">
            <Radio.Group
              defaultValue={searchParams.get("status")}
              onChange={(e) => {
                handleStatusSelect(e, props);
              }}
            >
              <Space direction="vertical">
                {props.filters &&
                  props.filters.map((el, index) => {
                    return (
                      <Radio
                        key={index}
                        name={"status"}
                        value={el.value}
                        onChange={(e) => {
                          handleStatusSelect(e, props);
                        }}
                      >
                        {el.text}
                      </Radio>
                    );
                  })}
              </Space>
            </Radio.Group>
            <div>
              <Button
                onClick={() => props && handleStatusReset()}
                size="small"
                style={{ width: 90, marginTop: "10px" }}
              >
                Reset
              </Button>
            </div>
          </div>
        );
      },
      render: (text: TAppointmentStatus) => {
        return (
          <div className="text-md font-semibold">
            {/* {workOrderStatusText[text]} */}
            {appointmentStatusText[text]}
          </div>
        );
      },
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, { _id }) => {
        return (
          <Flex wrap="wrap" gap="small">
            <div
              onClick={() => {
                router.push("/employee/dashboard/workorder/" + _id);
              }}
              style={{ color: "#1890ff" }}
              className="cursor-pointer"
            >
              <IoIosEye size={"22px"} title="View Appointments" />
            </div>
            {/* view appointments */}
            {/* <Button
                                onClick={() => {
                                    router.push("/employee/dashboard/workorder/create?appointmentId=" + _id)
                                }}
                                style={{ border: "1px #24ae55 solid", color: "#24ae55" }}
                                size="middle"
                                icon={<MdAddChart size={"22px"} title="Create WorkOrder" />}
                            ></Button> */}
          </Flex>
        );
      },
    },
  ];
  return column_work_data_table;
}