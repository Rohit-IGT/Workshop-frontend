"use client";
import Watermark from "@/app/components/Text/WatermarkText";
import { useTranslations } from "next-intl";

interface NotificationItem {
  title: string;
  desc: string;
}

interface NotificationsProps {
  show: any;
  notificationData?: any; // Define the type for the show prop
}

const Notifications: React.FC<NotificationsProps> = ({
  show,
  notificationData,
}) => {
  const t = useTranslations("Notifications");

  return (
    <>
      <div className="mt-4">
        <div className="heading relative  before:content-[''] before:absolute before:right-0 before:top-1/2 before:translate-y-[-50%] before:w-[66%] sm:before:w-[77%] before:h-2 before:bg-gradient-to-r before:from-[#FFE301] before:to-[#A79638]">
          {/* <h2 className="text-xl font-bold">{t("history")}</h2> */}
          <h2 className="text-xl font-bold">Notifications</h2>
        </div>

        {show === 2 ? (
          <ul className="mt-4 flex flex-col gap-3">
            {notificationData?.length > 0 ? (
              notificationData
                .slice(0, 2)
                ?.map((item: NotificationItem, index: number) => (
                  <li
                    key={index}
                    className='relative ps-6 before:content=[""] before:absolute before:left-0 before:top-1/2 before:translate-y-[-50%] before:h-[10px] before:w-[10px] before:rounded-full before:bg-yellow-300'
                  >
                    {item.title}
                  </li>
                ))
            ) : (
              <div className="py-4 relative">
                <Watermark text={t("empty")} />
              </div>
            )}
          </ul>
        ) : (
          <ul
            className={`relative ${notificationData?.length > 3 && 'before:content-[""] before:h-16'} before:absolute before:right-0 before:bottom-0 before:w-full `}
          >
            {notificationData?.length > 0 ? (
              notificationData?.map((item: NotificationItem, index: number) => (
                <li key={index} className="ps-10 mt-4">
                  <h3 className='font-semibold text-base relative before:content-[""] before:absolute before:left-[-35px] before:top-1/2 before:translate-y-[-50%] before:w-[15px] before:h-[15px] before:rounded-full before:bg-[#FFE301]'>
                    {item.title}
                  </h3>
                  <p>{item.desc}</p>
                </li>
              ))
            ) : (
              <div className="py-4 relative h-[43vh]">
                <Watermark text={"No History Available"} />
              </div>
            )}
          </ul>
        )}
      </div>
    </>
  );
};

export default Notifications;
