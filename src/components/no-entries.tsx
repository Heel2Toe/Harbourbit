import { motion } from "framer-motion";

const NoEntries = () => {
    
    return ( 
        <motion.div 
        initial={{
          opacity: 0
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.5,
        }}
        className="mt-10 self-center">
        <div className="text-white flex flex-col justify-center items-center">
          <h1 className="font-extrabold text-3xl">No Entries.</h1>
          <p className="font-thin">No entries were made this month.</p>
        </div>
      </motion.div>
     );
}
 
export default NoEntries;