import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="fixed inset-0  z-[500] cursor-not-allowed">
      <div className="fixed z-[1000] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="bg-opacity-80 p-6 bg-gray-50 rounded-xl"
          >
            <motion.h1
              className="text-3xl font-extrabold text-[#ba6969] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 logo-anim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              HB
            </motion.h1>
            <motion.div
              className="relative spinner-anim rounded-full flex justify-center items-center h-20 w-20 border-8 border-transparent border-t-[#ba6969] border-b-[#ba6969]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
      </div>
    </div>
  );
};

export default Spinner;
