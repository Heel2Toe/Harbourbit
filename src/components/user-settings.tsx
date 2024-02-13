import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./navbar";
import { useUser } from "../hooks/use-user";
import UserIdCopy from "./ui/user-id-copy";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSpinner } from "../hooks/use-spinner";
import axios from "axios";
import { handleJwt } from "../utils/handle-jwt";
import { useEffect, useState } from "react";

const UserSettings = () => {

    const {username, userId, accessToken, refreshToken, logoutUser, updateUser} = useUser();
    const [stats, setStats] = useState({monthTotal: 0, lifeTotal: 0});
    const navigate = useNavigate();
    const {setSpinner} = useSpinner();

    useEffect(()=>{
      const getStats = async () => {
       if(!userId || !accessToken){ navigate('/'); toast.error('Session expired'); return;}
       try {
        setSpinner(true);
        const result = await axios.get(`${import.meta.env.VITE_BASE_URL}/journal/getStats/${userId}`,{
          headers: {
            'x-access-token' : accessToken
          }
        });
        setStats({monthTotal: result.data.monthTotal, lifeTotal: result.data.lifeTotal});
       } 
       catch (error: any) {
        if(error.response.data == 'Token Expired'){
          const result = await handleJwt(refreshToken);
           if(result){
             updateUser({accessToken: result});
           }
           else{
            logoutUser();
            navigate('/');
           }
        }
        else if(error.response.data == 'Invalid Token'){
          logoutUser();
          navigate('/');
          toast.error('Unauthorized');
        }
        else{
          toast.error('Internal server error');
          console.log('Error at dashboard.tsx \n:',error);
        }
      } finally {
        setSpinner(false);
      } 
      }

      getStats();
    },[])

    const deleteUser = async () => {
      if(!userId || !accessToken){ navigate('/'); toast.error('Session expired'); return;}
      try {
        setSpinner(true);
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/deleteUser/${userId}`,{
          headers:{
            'x-access-token' : accessToken
          }
        })
        toast.success('Account deleted !');
        logoutUser();
        navigate('/');
      } catch (error: any) {
        if(error.response.data == 'Token Expired'){
          const result = await handleJwt(refreshToken);
           if(result){
             updateUser({accessToken: result});
           }
           else{
            logoutUser();
            navigate('/');
           }
        }
        else if(error.response.data == 'Invalid Token'){
          logoutUser();
          navigate('/');
          toast.error('Unauthorized');
        }
        else{
          toast.error('Internal server error');
          console.log('Error at dashboard.tsx \n:',error);
        }
      } finally {
        setSpinner(false);
      } 
    }

    const deleteJournals = async () => {
      if(!userId || !accessToken) { navigate('/'); toast.error('Session expired'); return;}
      try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/journal/deleteJournals/${userId}`,{
          headers:{
            'x-access-token' : accessToken
          }
        })
        navigate('/dashboard');
        toast.success('A clean slate :D');
      } 
      catch (error: any) {
        if(error.response.data == 'Token Expired'){
          const result = await handleJwt(refreshToken);
           if(result){
             updateUser({accessToken: result});
           }
           else{
            logoutUser();
            navigate('/');
           }
        }
        else if(error.response.data == 'Invalid Token'){
          logoutUser();
          navigate('/');
          toast.error('Unauthorized');
        }
        else{
          toast.error('Internal server error');
          console.log('Error at dashboard.tsx \n:',error);
        }
      } finally {
        setSpinner(false);
      } 
    }


    return ( 
        <div className="h-full p-5 gap-y-3 bg-[#a15a5a] flex flex-col items-center">
        <Navbar/>
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
             <h1 className="font-extrabold text-3xl">Your Account</h1>

             <div className="h-full w-[95%] border rounded-xl p-5 space-y-6">
               <div className="flex items-center justify-between space-x-2">
                <p className="text-lg font-thin">Total entries made</p>
                <hr className="w-1/2 text-white"/>
                <p className="text-lg flex items-center justify-center font-thin h-10 w-10 border rounded-lg">{stats.lifeTotal == 0 ? '-' : stats.lifeTotal}</p>
               </div>

               <div className="flex items-center justify-between space-x-2">
                <p className="text-lg font-thin">Entries this month</p>
                <hr className="w-1/2 text-white"/>
                <p className="text-lg flex items-center justify-center font-thin h-10 w-10 border rounded-lg">{stats.monthTotal == 0 ? '-' : stats.monthTotal}</p>
               </div>

               <div className="mt-10 flex items-center justify-between space-x-2">
                <p className="text-lg font-thin">Delete all journals</p>
                <button 
                onClick={deleteJournals}
                className="p-2 border flex justify-center items-center h-10 w-10 rounded-lg"><MdDelete className="text-xl"/></button>
               </div>

               <div className="mt-10 flex items-center justify-between space-x-2">
                <p className="text-lg font-thin">Delete Account</p>
                <button 
                onClick={deleteUser}
                className="p-2 border flex justify-center items-center h-10 w-10 rounded-lg"><MdDelete className="text-xl"/></button>
               </div>
               
             </div>
            </div>

            <div className="w-1/2 h-full space-y-2 flex flex-col justify-between">
             <div className="h-[95%] w-full rounded-xl border flex flex-col items-center">
              <h1 className="text-xl font-thin mt-10">You are</h1>
              <h1 className="text-5xl font-extrabold">{username} !</h1>
             </div>

             <UserIdCopy userId={userId!} />
            </div>


          </div>
          </motion.div>
        </AnimatePresence>
      </div>
     );
}
 
export default UserSettings;