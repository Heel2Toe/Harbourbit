import { motion } from "framer-motion";
import { JournalProps } from "./dashboard";
import dateFormatter from "../utils/date-formatter";
import axios from "axios";
import { useUser } from "../hooks/use-user";
import toast from "react-hot-toast";
import { useLoading } from "../hooks/use-loader";
import { useNavigate } from "react-router-dom";
import { useReload } from "../hooks/trigger-reload";
import DeleteButton from "./ui/delete-button";
import handleError from "../utils/handle-error";

interface SingleJournalProps {
  journal: JournalProps;
}

const SingleJournal: React.FC<SingleJournalProps> = ({ journal }) => {
  const { accessToken, refreshToken, logoutUser, updateUser } = useUser();
  const { triggerReload } = useReload();
  const navigate = useNavigate();
  const { setLoading } = useLoading();

  const onDelete = async (journalId: String) => {
    if (!journalId) return;
    try {
      setLoading({ spinner: true });
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/journal/deleteJournal/${journalId}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      toast.success("Entry deleted !");
      triggerReload();
      journal.title = "";
    } catch (error: any) {
      handleError(error, logoutUser, updateUser, navigate, refreshToken!);
    } finally {
      setLoading({ spinner: false });
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        translateX: "-200%",
      }}
      animate={{
        opacity: 1,
        translateX: 0,
      }}
      exit={{
        opacity: 0,
        translateX: "200%",
      }}
      transition={{
        duration: 0.5,
        type: "spring",
      }}
      className="w-full"
    >
      {journal.title == "" ? (
        <div className="w-full flex flex-col space-y-2 mt-14 justify-center items-center text-white">
          <h1 className="font-extrabold text-3xl">Select your entry.</h1>
          <p className=" font-thin text-sm">
            Select on entry to read clearly and in full length.
          </p>
        </div>
      ) : (
        <div className="w-full">
          <div className="w-full mt-10 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h1 className=" font-extrabold text-xl">{journal.title}</h1>
              <div className="mt-1 border text-xs rounded-xl px-2">
                {journal.mode ? "public" : "private"}
              </div>
            </div>
            <p className="text-sm font-thin">
              {dateFormatter(journal.createdAt)}
            </p>
          </div>
          <div className="flex flex-col">
            <p className="mt-4">{journal.content}</p>

            <div className="self-end mt-5">
              <DeleteButton onClick={() => onDelete(journal.journalId)} />
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default SingleJournal;
