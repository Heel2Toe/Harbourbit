import { useState } from "react";
import SigninCard from "./signin-card";
import { AnimatePresence, motion } from "framer-motion";
import LinksVisit from "./ui/links-visit";

const Auth = () => {
  const [card, setCard] = useState(false);

  return (
    <div className="relative h-full w-full text-white bg-[#924e4e] flex flex-col items-center p-10">
      <div className="w-full flex justify-between">
        <motion.div 
        key={1}
        initial={{x:-75, opacity: 0}}
        animate={{x:0, opacity: 1}}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-10 w-[40%]">
          Welcome to Harbourbit, the ultimate destination for journaling
          enthusiasts. Our platform offers a seamless experience for documenting
          your thoughts and experiences. With the added feature of sentiment
          analysis, gain valuable insights into the emotions behind your
          entries. Join our community today to start your journey of
          self-discovery and personal growth through the power of journaling.
        </motion.div>
        <motion.h1
          key={2}
          initial={{ y: 75, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="text-8xl self-end mt-10 font-extrabold  h-24"
        >
          Harbourbit.
        </motion.h1>

        <div className="fixed top-2 right-5 h-80 w-96 -z-4 border border-white" />
      </div>

      <div className="mt-10 self-start bg-white rounded-md">
        <button
          className="p-4 rounded-md border bg-[#924e4e] hover:translate-x-1 hover:-translate-y-1 duration-500"
          onClick={() => setCard(true)}
        >
          Get Started !
        </button>
      </div>
      
      <div className="w-full mt-20 flex justify-between items-center overflow-hidden">

      <LinksVisit/>

      <motion.div 
      initial={{ x: 45, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.25 }}
      className="border text-xs rounded-md w-64 p-5 flex items-center justify-center font-bold">
       <p>Made by Niranjan P.N</p> 
      </motion.div>
      </div>
      {card && <AnimatePresence>
                 <SigninCard onClose={()=>setCard(false)}/>
               </AnimatePresence>}
    </div>
  );
};

export default Auth;
