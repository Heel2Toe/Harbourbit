import { motion } from "framer-motion";
import dateFormatter from "../../utils/date-formatter";
import { JournalProps } from "../dashboard";

interface JournalCard {
    journal : JournalProps,
    onClick: () => void,
    delay: number
}

const JournalCard: React.FC<JournalCard> = ({
    journal,
    onClick,
    delay
}) => {

    return ( 
    <motion.div 
     initial={{
        opacity: 0,
     }}
     animate={{
        opacity: 1,
     }}
     transition={{
        duration: .6*delay
     }}
       onClick={onClick}
        className="relative min-h-40 border w-full rounded-xl flex flex-col space-y-1 p-3
        text-white hover:text-[#a15a5a] hover:bg-gray-50/80 duration-500 cursor-pointer">
     <h1 className=" font-extrabold">{journal.title}</h1>
     <p className=" font-thin ">
     {journal.content.length > 100 ? `${journal.content.slice(0,100)}...` : journal.content }
     </p>
     <p className="absolute right-2 bottom-2 font-thin text-sm">{dateFormatter(journal.createdAt)}</p>
    </motion.div>
     );
}
 
export default JournalCard;