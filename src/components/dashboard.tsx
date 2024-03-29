import axios from "axios";
import Navbar from "./navbar";
import JournalCard from "./ui/journal-card";
import { motion } from "framer-motion";
import { useUser } from "../hooks/use-user";
import { useEffect, useState } from "react";
import { useLoading } from "../hooks/use-loader";
import JournalInfo from "./journal-info";
import { useCalendar } from "../hooks/use-calendar";
import { useSwitcher } from "../hooks/use-switcher";
import { useNavigate } from "react-router-dom";
import NoEntries from "./no-entries";
import { useReload } from "../hooks/trigger-reload";
import handleError from "../utils/handle-error";

export interface JournalProps {
  journalId: string;
  authorId: string;
  title: string;
  content: string;
  createdAt: string;
  mode: boolean;
}

const Dash = () => {
  const { userId, accessToken, refreshToken, logoutUser, updateUser } = useUser();
  const navigate = useNavigate();
  const { setMode } = useSwitcher();
  const { month, year, setCalendar } = useCalendar();
  const { reloadVariable } = useReload();
  const { setLoading } = useLoading();
  const [journals, setJournals] = useState<JournalProps[]>([]);
  const [singleJournal, setSingleJournal] = useState<JournalProps>({
    journalId: "",
    authorId: "",
    title: "",
    content: "",
    createdAt: "",
    mode: false,
  });

  useEffect(() => {
    const getEntries = async () => {
      if (!userId || !accessToken || !refreshToken) {
        return;
      }
      try {
        setLoading({ spinner: true });
        const result = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/journal/getJournals/${userId}/${
            month + 1
          }/${year}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-access-token": accessToken,
            },
          }
        );
        setJournals(result.data.journals);
        setCalendar({ dates: result.data.dates });
      } catch (error: any) {
       handleError(error, logoutUser, updateUser, navigate, refreshToken);
      } finally {
        setLoading({ spinner: false });
      }
    };
    getEntries();
  }, [month, year, accessToken, reloadVariable]);

  return (
    <div className="h-full p-5 gap-y-3 bg-[#a15a5a] flex flex-col items-center">
      <Navbar />
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="h-full w-[95%] flex justify-between overflow-y-hidden"
      >
        <div className="h-full flex flex-col space-y-2 w-1/2 overflow-y-scroll hide-scrollbar">
          {journals.length != 0 ? (
            journals.map((journal, index) => (
              <JournalCard
                key={index}
                delay={index}
                journal={journal}
                onClick={() => {
                  setSingleJournal(journal);
                  setMode("journal");
                }}
              />
            ))
          ) : (
            <NoEntries />
          )}
        </div>

        <JournalInfo Journal={singleJournal} />
      </motion.div>
    </div>
  );
};

export default Dash;
