import { motion } from "framer-motion";
import { compareDates, getNumberOfDays } from "../utils/calendar-functions";
import { useEffect, useState } from "react";
import { FaCaretLeft } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { useCalendar } from "../hooks/use-calendar";
import classNames from "classnames";


const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const Calendar = () => {
  var currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const [dayDivs, setDayDivs] = useState<JSX.Element[]>([]);
  const {month, year, dates, setCalendar} = useCalendar();


  const calendarNav = (e: any) => {
    const direction = e.target.id;
    if (direction == "left") {
      if (month == 0) {
        setCalendar({  month: 11, year: year-1 });
      } else {
        setCalendar({  month: month-1 });
      }
    } else {
      if (month == 11) {
        setCalendar({ month: 0, year: year+1 });
      } else {
        setCalendar({ month: month + 1 });
      }
    }
  };

  useEffect(() => {
    const renderDays = () => {
      const daysArray = [];

      for (let i = 1; i <= getNumberOfDays(month, year); i++) {

        let current = compareDates(new Date(year, month, i));
        
        if (dates.includes(i)) {
          daysArray.push(
            <div
              key={i}
              className={classNames(`p-3 py-4 text-white rounded-sm
             bg-orange-300/80 border flex justify-center items-center text-xs`,
              current ? 'border-black' : '' )}
            > {i} 
            </div>
          );
        } else {
          daysArray.push(
            <div
              key={i}
              className={classNames("p-3 py-4 border flex justify-center items-center text-xs",
                         current ? 'border-[#a15a5a]' : '' )}
            >
              {i}
            </div>
          );
        }
      }
      setDayDivs(daysArray);
    };
    renderDays();

  }, [month,dates]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        translateX: "200%",
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      exit={{
        opacity: 0,
        translateX: "-200%",
      }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
      className="w-full"
    >
      <div className="mt-8 h-full bg-gray-50/80 p-2 flex space-y-3 justify-center flex-wrap rounded-md">
        <div className="w-full flex justify between">

          <FaCaretLeft
            className="text-[#a15a5a] cursor-pointer rounded-sm p-1 hover:bg-[#a15a5a] hover:text-white duration-500 text-2xl"
            id="left"
            onClick={(e) => calendarNav(e)}
          />

          <div className="w-full flex flex-col items-center rounded-md text-[#a15a5a]">
            <h1 className="text-2xl font-extrabold">
              {monthNames[month]}
            </h1>
            <p className="text-sm ">{year}</p>
          </div>

          <FaCaretRight
            className="text-[#a15a5a] cursor-pointer rounded-sm p-1 hover:bg-[#a15a5a] hover:text-white duration-500 text-2xl"
            id="right"
            onClick={(e) => calendarNav(e)}
          />
        </div>
        
        <div className="w-full text-[#a15a5a] grid grid-cols-7">{dayDivs}</div>
        
      </div>
    </motion.div>
  );
};

export default Calendar;
