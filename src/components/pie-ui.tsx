import { Cell, Pie, PieChart } from "recharts";
import { PieDataProps } from "./user-settings";
import PieDescription from "./ui/pie-description";
import { ImInfo } from "react-icons/im";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PieProps {
  pieData: PieDataProps[];
}

const colors = [
  {
    sentiment: "positive",
    color: "#ffffff",
  },
  {
    sentiment: "negative",
    color: "#ffd699",
  },
  {
    sentiment: "neutral",
    color: "#d2b48c",
  },
];

const PieUi: React.FC<PieProps> = ({ pieData }) => {
  const [noEntries, setNoEntries] = useState(false);

  useEffect(() => {
    setNoEntries(pieData.every((item) => item.value == 0));
  }, [pieData]);

  return (
    <div className="relative p-1 rounded-xl border flex flex-col items-center">
      <ImInfo className="absolute top-1 right-1 h-4 w-4 cursor-pointer" />
      <AnimatePresence>
        {noEntries && (
          <motion.div
            initial={{
              translateX: "-100%",
              opacity: 0,
            }}
            animate={{
              translateX: 0,
              opacity: 1,
            }}
            transition={{
              type: "spring",
              delay: 1,
            }}
            className="absolute z-10 h-full w-full bg-[#a15a5a]/50 rounded-xl top-0 flex justify-center items-center"
          >
            <p className="font-extrabold ">NO ENTRIES MADE</p>
          </motion.div>
        )}
      </AnimatePresence>

      <h1 className="text-xs ml-2 font-extrabold">MOOD ANALYSIS</h1>
      <div className="px-1 flex justify-between items-center">
        <PieChart width={150} height={150} key={Math.random()}>
          <Pie
            data={pieData}
            cx={"40%"}
            dataKey="value"
            nameKey="name"
            innerRadius={40}
            outerRadius={50}
            paddingAngle={4}
            fill="#82ca9d"
          >
            {pieData.map((_, index) => (
              <Cell
                key={index}
                fill={colors[index].color}
                className="outline-none"
              />
            ))}
          </Pie>
        </PieChart>

        <div className="flex flex-col justify-center">
          {colors.map((item, index) => (
            <PieDescription
              key={index}
              sentiment={item.sentiment}
              color={item.color}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PieUi;
