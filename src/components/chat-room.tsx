import { useEffect } from "react";
import { useLoading } from "../hooks/use-loader";
import { IoChatbox, IoExit } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const ChatRoom = () => {
  const { setLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading({ loadingPage: false });
  }, []);
  return (
    <div className="h-full bg-green-600 flex justify-between items-center space-x-4 p-4">
      <div className="w-[30%] relative h-full bg-white/80 rounded-xl flex flex-col items-center p-2">
        <button
          onClick={() => navigate("/newEntry")}
          title="exit"
          className="absolute top-1 left-1 p-2 border bg-green-600 text-white rounded-md
         hover:bg-transparent hover:text-green-600 duration-500"
        >
          <IoExit />
        </button>

        <h1 className="flex items-center font-extrabold text-green-600 text-2xl">
          HBCHAT
          <IoChatbox />
        </h1>
      </div>

      <div className="w-full h-full border rounded-xl flex justify-center items-center">
        <h1 className=" font-extrabold text-5xl text-white">COMING SOON</h1>
      </div>
    </div>
  );
};

export default ChatRoom;
