import { AnimatePresence } from "framer-motion";
import { useSwitcher } from "../hooks/use-switcher";
import Calendar from "./calendar";
import SingleJournal from "./single-journal";
import SwitcherNotch from "./ui/switcher-notch";
import { JournalProps } from "./dashboard";

interface JournalInfoProps {
  Journal: JournalProps,
}

const JournalInfo: React.FC<JournalInfoProps> = ({
  Journal,
}) => {
  const { mode } = useSwitcher();

  return (
    <div className="relative text-white h-full w-[45%] p-4 border rounded-xl overflow-y-scroll hide-scrollbar">
      <SwitcherNotch />

      <AnimatePresence>
            {mode == "journal" ? 
              <SingleJournal journal={Journal}/>
            : 
              <Calendar/>
            }
      </AnimatePresence>
    </div>
  );
};

export default JournalInfo;
