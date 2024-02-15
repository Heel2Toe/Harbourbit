import { FaFire } from "react-icons/fa";

const UserStreak = ({streak}:{streak:number}) => {
    return ( 
        <div className="relative p-1 h-[175px] bg-gray-50/80 text-[#ba6969] w-[230px] 
          flex justify-center items-center border rounded-xl">
          <h1 className="absolute top-1 text-xs font-extrabold">JOURNALING STREAK</h1>
          <div className="flex items-center justify-center space-x-2 rounded-md p-2 border border-[#ba6969]">
          <FaFire className="text-4xl"/>
          <h1 className="text-4xl font-extrabold">{streak}</h1>
          </div>
        </div>
     );
}
 
export default UserStreak;