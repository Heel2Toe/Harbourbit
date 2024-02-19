import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import TextBox from "./ui/text-box";
import { useLoading } from "../hooks/use-loader";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../hooks/use-user";
import { useNavigate } from "react-router-dom";
import handleError from "../utils/handle-error";

const NewEntry = () => {
  const { setLoading } = useLoading();
  const { userId, accessToken, refreshToken, logoutUser, updateUser } =
    useUser();
  const [journal, setJournal] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleInput = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const textboxName = e.target.name;
    setJournal((prev) => ({
      ...prev,
      [textboxName]: e.target.value,
    }));
  };

  const sendEntry = async () => {
    if (!journal.title) {
      toast.error("You need a title !");
    } else if (!journal.content) {
      toast.error("You cant leave the content blank :|");
    } else if (!userId) {
      toast.error("Session expired !");
      navigate("/");
    }
    try {
      setLoading({ spinner: true });
      await axios.post(
        `${import.meta.env.VITE_BASE_URL}/journal/insertJournal`,
        { userId, title: journal.title, content: journal.content },
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      navigate(`/dashboard`, { replace: true });
    } catch (error: any) {
      handleError(error, logoutUser, updateUser, navigate, refreshToken!);
    } finally {
      setLoading({ spinner: false });
    }
  };
  return (
    <div className="h-full p-5 gap-y-3 bg-[#a15a5a] flex flex-col items-center">
      <Navbar />
      <AnimatePresence>
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
          className="w-[95%] border h-full p-5 rounded-xl"
        >
          <div className="h-full flex flex-col">
            <div className="h-1/2 flex">
              <div className="flex flex-col space-y-2 w-1/2 h-full">
                <button
                  onClick={() => sendEntry()}
                  className="p-4 border mb-8 w-[90%] font-extrabold rounded-md text-white
                            hover:bg-white hover:text-[#a15a5a]"
                >
                  finish
                </button>
                <label className="font-thin text-white">Name</label>
                <TextBox name="title" className="text-white" type="text" onChange={handleInput} />
              </div>
              <div className="w-1/2 h-full flex flex-col justify-center items-center text-white">
                <h1 className=" font-extrabold text-6xl">New Entry.</h1>
                <p>Journal your thoughts.</p>
              </div>
            </div>
            <div className="h-1/2 flex flex-col space-y-2">
              <label className="font-thin text-white">Journal Entry</label>
              <textarea
                name="content"
                className="rounded-xl bg-transparent border outline-none w-full h-full 
                        p-2 text-white font-thin"
                onChange={handleInput}
              />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default NewEntry;
