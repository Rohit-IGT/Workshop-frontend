"use client";
import Logout from "@/app/components/Logout/Logout";
import { useAppSelector } from "@/app/store/reduxHooks";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Layout, Space } from "antd";
import SideBarMenus from "./SideBarMenus";
import { useEffect, useState } from "react";
import { IAuthData } from "@/app/store/slices/authSlice";
import { useTranslations } from "next-intl";

const { Sider } = Layout;

interface SideBarProps {
  sidebarWidth: number;
}

const SideBar = ({ sidebarWidth }: SideBarProps) => {
  const [user, setUser] = useState<IAuthData>();
  const authData = useAppSelector((state) => state.auth.authData);
  const t = useTranslations("CustomerSidebar");

  useEffect(() => {
    setUser(authData);
  }, [authData]);

  return (
    <Sider
      width={sidebarWidth}
      theme="light"
      trigger={null}
      collapsible
      breakpoint="md"
      style={{
        height: "100vh",
        position: "fixed",
        top: 0,
        overflow: "hidden",
        zIndex: 999,
        padding: "1em",
      }}
    >
      <Space className={`w-full mb-6`}>
        <Avatar size={"large"} icon={<UserOutlined />} />
        <div>
          <h2 className="text-white1 font-semibold text-xl capitalize">
            {t("heading")}, {user?.fullName?.split(" ")[0]}
          </h2>
          <p className="text-gray1 text-sm font-medium">Customer</p>
        </div>
      </Space>

      <SideBarMenus />

      <div className="w-[150px] lg:w-[200px]  absolute bottom-6 left-1/2 translate-x-[-50%] border-t pt-10">
        <Logout />
      </div>
    </Sider>
  );
};

export default SideBar;
