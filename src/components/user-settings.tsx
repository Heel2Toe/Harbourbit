import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import { useUser } from "../hooks/use-user";
import UserIdCopy from "./ui/user-id-copy";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLoading } from "../hooks/use-loader";
import axios from "axios";
import { useEffect, useState } from "react";
import PieUi from "./pie-ui";
import JournalStats from "./journal-stats";
import SettingsActions from "./settings-actions";
import UserStreak from "./user-streak";
import handleError from "../utils/handle-error";

export interface PieDataProps {
  name: string;
  value: number;
}

const UserSettings = () => {
  const {
    userId,
    username,
    accessToken,
    refreshToken,
    logoutUser,
    updateUser,
  } = useUser();

  const [stats, setStats] = useState({
    monthTotal: 0,
    lifeTotal: 0,
    streak: 0,
  });
  const [pieData, setPieData] = useState<PieDataProps[]>([
    { name: "Positive", value: 0 },
    { name: "Negative", value: 0 },
    { name: "Neutral", value: 0 },
  ]);

  const navigate = useNavigate();
  const { setLoading } = useLoading();

  useEffect(() => {
    const getStats = async () => {
      if (!userId || !accessToken) {
        return;
      }
      try {
        setLoading({ spinner: true });
        const result = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/journal/getStats/${userId}`,
          {
            headers: {
              "x-access-token": accessToken,
            },
          }
        );
        setStats({
          monthTotal: result.data.monthTotal,
          lifeTotal: result.data.lifeTotal,
          streak: result.data.streak,
        });
        setPieData(result.data.pieData);
      } catch (error: any) {
        handleError(error, logoutUser, updateUser, navigate, refreshToken!);
      } finally {
        setLoading({ spinner: false });
      }
    };

    getStats();
  }, [accessToken]);

  const deleteUser = async () => {
    if (!userId || !accessToken) {
      navigate("/");
      toast.error("Session expired");
      return;
    }
    try {
      setLoading({ spinner: true });
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/user/deleteUser/${userId}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      toast.success("Account deleted !");
      logoutUser();
      navigate("/");
    } catch (error: any) {
      handleError(error, logoutUser, updateUser, navigate, refreshToken!);
    } finally {
      setLoading({ spinner: false });
    }
  };

  const deleteJournals = async () => {
    if (!userId || !accessToken) {
      navigate("/");
      toast.error("Session expired");
      return;
    }
    try {
      setLoading({ spinner: true });
      await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/journal/deleteJournals/${userId}`,
        {
          headers: {
            "x-access-token": accessToken,
          },
        }
      );
      navigate("/dashboard");
      toast.success("A clean slate :D");
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
          className="w-[95%] border h-full p-5 rounded-xl flex"
        >
          <div className="w-full h-full flex text-white">
            <div className="w-1/2 flex flex-col space-y-6 items-center justify-center">
              <h1 className="font-extrabold text-3xl">
                {username?.charAt(0).toUpperCase().concat(username.slice(1))}'s
                Account
              </h1>

              <div className="h-full w-[95%] border rounded-xl p-5 space-y-6">
                <JournalStats
                  title="Total entries made"
                  value={stats.lifeTotal}
                />
                <JournalStats
                  title="Entries this month"
                  value={stats.monthTotal}
                />
                <SettingsActions onClick={deleteUser} title="Delete account" />
                <SettingsActions
                  onClick={deleteJournals}
                  title="Delete all entries"
                />
              </div>
            </div>

            <div className="w-1/2 h-full space-y-2 flex flex-col justify-between">
              <div className="h-[95%] p-4 w-full flex flex-col items-center rounded-xl border">
                <h1 className="font-extrabold text-2xl mb-3">Statistics</h1>
                <div className="w-full flex justify-between items-start p-4">
                  <UserStreak streak={stats.streak} />
                  <PieUi pieData={pieData} />
                </div>
              </div>

              <UserIdCopy userId={userId!} />
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default UserSettings;
