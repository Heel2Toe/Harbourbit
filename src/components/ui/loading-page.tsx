import { motion } from "framer-motion";
import { IoChatbox } from "react-icons/io5";
import { useLoading } from "../../hooks/use-loader";

const LoadingPage = () => {
    
    return ( 
      <motion.div 
       initial={{
        translateY: '100%',
       }}
       animate={{
        translateY: 0,
       }}
       exit={{
        opacity: 0
       }}
       transition={{
        type: 'just',
        duration: .5
       }}
      className="fixed h-full w-full z-40 bg-green-600 flex items-center justify-center">
        <div className="text-white font-extrabold text-4xl flex items-center p-4 rounded-xl border">
          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0}}
          >H</motion.h1>

                    <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.1}}
          >B</motion.h1>    

          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.2}}
          >C</motion.h1>  

          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.3}}
          >H</motion.h1>  

          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.4}}
          >A</motion.h1>      

          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.5}}
          >T</motion.h1>
          

          <motion.h1
          initial={{translateY: '100%'}}
          animate={{translateY: 0}}
          transition={{delay: 0.6, type: 'spring', damping: 7}}
          ><IoChatbox/></motion.h1>
        
        </div>
      </motion.div>
     );
}
 
export default LoadingPage;