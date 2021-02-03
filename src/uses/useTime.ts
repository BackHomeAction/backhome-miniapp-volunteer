import dayjs from "@/utils/dayjs";

export const useTime = () => {
  const getCalendarTime = (time: string) => {
    return dayjs(time).calendar(dayjs(), {
      sameDay: "今天 HH:mm", // The same day ( Today at 2:30 AM )
      nextDay: "明天 HH:mm", // The next day ( Tomorrow at 2:30 AM )
      nextWeek: "下周dd HH:mm", // The next week ( Sunday at 2:30 AM )
      lastDay: "昨天 HH:mm", // The day before ( Yesterday at 2:30 AM )
      lastWeek: "上周dd HH:mm", // Last week ( Last Monday at 2:30 AM )
      sameElse: "YYYY-MM-DD HH:mm", // Everything else ( 7/10/2011 )
    });
  };

  return { getCalendarTime };
};
