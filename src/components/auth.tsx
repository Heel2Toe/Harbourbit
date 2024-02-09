import { AnimatePresence } from "framer-motion";
import Blob from "./ui/blob";
import TextBox from "./ui/text-box";
import { useState } from "react";
import Button from "./ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/use-user";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [blob, setBlob] = useState({loading: false, success: false});
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: "",
    rePassword: "",
  });

  const handleInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const textboxName = e.target.name;
    setUser((prev) => ({
      ...prev,
      [textboxName]: e.target.value,
    }));
  };

  const userAuth = async () => {
    try {
      setBlob((prev) => ({ ...prev, loading: true }));

      if (login) {
        if(!user.username || !user.password){
          toast.error("Enter all details");
          return;
        }
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signin`, {
          username: user.username,
          password: user.password,
        });

        updateUser({
          userId: response.data.userId,
          username: user.username,
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
        });

        setBlob((prev) => ({ ...prev, success: true }));
  
        setTimeout(() => {
          navigate(`/dashboard`);
        }, 600);
  

      } else {
        if(!user.username || !user.password || !user.rePassword){
          toast.error("Enter all details");
          return;
        }
        if (user.password !== user.rePassword) {
          toast.error("Password mismatch");
          return;
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/signup`, {
          username: user.username,
          password: user.password,
        });
  
        updateUser({
          userId: response.data.userId,
          username: user.username,
          refreshToken: response.data.refreshToken,
          accessToken: response.data.accessToken,
        });
  
        setBlob((prev) => ({ ...prev, success: true }));
  
        setTimeout(() => {
          navigate(`/dashboard`);

        }, 600);
      }
    } catch (err: any) {
      toast.error(err.response?.data || "Something went wrong");
      console.error(err);
    } finally {
      setBlob((prev) => ({ ...prev, loading: false }));
    }
  };

  return (
    <div className="h-full bg-grad flex justify-between items-center p-10">
      <Blob loading={blob.loading} success={blob.success}/>

      <div className="relative h-96 w-[500px] rounded-md flex flex-col items-center bg-[#928181] shadow-lg mr-10 p-5 space-y-4">
        <h1 className="text-gray-300 text-5xl font-extrabold">
          {login ? "Sign in." : "Get Started."}
        </h1>
        <Button 
          mode="primary" text={login ? 'new user ?' : 'current user ?'} 
          className="absolute right-0 bottom-0 rounded-none rounded-br-md rounded-tl-md p-1"
          onClick={()=>setLogin(!login)}
          />
        <TextBox name="username" placeholder="username" type="text" onChange={handleInput} />
        <TextBox name="password" placeholder="password" type="password" onChange={handleInput} />

        <AnimatePresence>
          {!login && (
            <TextBox
              key={1}
              name="rePassword"
              placeholder="re enter password"
              type="password"
              onChange={handleInput}
            />
          )}
          <Button
            onClick={() => userAuth()}
            mode="secondary"
            text={login ? "Sign in" : "Sign up"}
            key={2}
          />
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
