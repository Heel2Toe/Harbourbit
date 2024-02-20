import { motion } from "framer-motion";
import Button from "./ui/button";
import TextBox from "./ui/text-box";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useUser } from "../hooks/use-user";
import { useNavigate } from "react-router-dom";
import { useLoading } from "../hooks/use-loader";

const SigninCard = ({onClose}:{onClose : () => void}) => {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const [user, setUser] = useState({username: "", password: "", rePassword: ""});
  const [login, setLogin] = useState(true);
  const { setLoading } = useLoading();

  const userAuth = async () => {
    try {
      setLoading({ spinner: true });
      if (login) {
        if (!user.username || !user.password) {
          toast.error("Enter all details");
          return;
        }
        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/signin`,
          {
            username: user.username,
            password: user.password,
          }
        );

        updateUser({
          userId: response.data.userId,
          username: user.username,
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
        });
        navigate(`/dashboard`);
      } else {
        if (!user.username || !user.password || !user.rePassword) {
          toast.error("Enter all details");
          return;
        }
        if (user.password !== user.rePassword) {
          toast.error("Password mismatch");
          return;
        }

        const response = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/user/signup`,
          {
            username: user.username,
            password: user.password,
          }
        );

        updateUser({
          userId: response.data.userId,
          username: user.username,
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
        });
        navigate("/dashboard");
      }
    } catch (err: any) {
      toast.error(err.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setLoading({ spinner: false });
    }
  };

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const textboxName = e.target.name;
    setUser((prev) => ({
      ...prev,
      [textboxName]: e.target.value,
    }));
  };

  return (
    <div className="fixed inset-0 z-30">
      <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <motion.div
          initial={{ opacity: 0}}
          animate={{ opacity: 1}}
          exit={{ opacity: 0}}
          className="relative h-96 w-[500px] rounded-md flex flex-col items-center bg-gray-100 shadow-lg p-5 space-y-4"
        >
          <button
            onClick={onClose}
            className="absolute top-1 right-2 font-extrabold text-[#924e4e]"
          >
            X
          </button>
          <Button
            mode="primary"
            text={login ? "new user ?" : "current user ?"}
            className="absolute right-0 bottom-0 rounded-none rounded-br-md rounded-tl-md p-1"
            onClick={() => {
              setLogin(!login);
            }}
          />
          <h1 className="text-[#924e4e] text-5xl font-extrabold">
            {login ? "Sign in." : "Get Started."}
          </h1>
          <TextBox
            name="username"
            className="border-[#924e4e] text-[#924e4e] placeholder:text-[#924e4e]"
            placeholder="username"
            type="text"
            onChange={handleInput}
          />
          <TextBox
            name="password"
            className="border-[#924e4e] text-[#924e4e] placeholder:text-[#924e4e]"
            placeholder="password"
            type="password"
            onChange={handleInput}
          />
          {!login && (
            <TextBox
              key={1}
              className="border-[#924e4e] text-[#924e4e] placeholder:text-[#924e4e]"
              name="rePassword"
              placeholder="re enter password"
              type="password"
              onChange={handleInput}
            />
          )}   
            <Button
              onClick={() => userAuth()}
              mode="primary"
              text={login ? "Sign in" : "Sign up"}
              key={2}
            />
        </motion.div>
      </div>
    </div>
  );
};

export default SigninCard;
