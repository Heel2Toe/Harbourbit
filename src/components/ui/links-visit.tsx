import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FaGithub, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { Link } from "react-router-dom";

const LinksVisit = () => {
  const onCopy = () => {
    navigator.clipboard.writeText(`+919074407413`);
    toast.success("Phone number copied");
  };

  return (
    
    <div className=" border items-center w-64 p-5 rounded-md flex justify-between">
      <motion.div
        initial={{ y: 75, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.1 }}
      >
        <Link
          to={
            "https://mail.google.com/mail/?view=cm&fs=1&to=npn153624@gmail.com"
          }
          target="_blank"
        >
          <SiGmail />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 75, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.25 }}
      >
        <Link to={"https://github.com/Heel2Toe"} target="_blank">
          <FaGithub />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 75, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.4 }}
      >
        <Link
          to={"https://www.linkedin.com/in/niranjan-p-n-81b74128b/"}
          target="_blank"
        >
          <FaLinkedin />
        </Link>
      </motion.div>

      <motion.div
        initial={{ y: 75, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.55 }}
      >
        <FaPhoneAlt  onClick={onCopy} className="cursor-pointer"/>
      </motion.div>
    </div>
  );
};

export default LinksVisit;
