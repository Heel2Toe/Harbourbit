import toast from "react-hot-toast";
import { FaCopy, FaUser } from "react-icons/fa";

interface UserIdCopyProps {
    userId: string
}

const UserIdCopy:React.FC<UserIdCopyProps> = ({userId}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(`My harbourbit id : ${userId}`);
        toast.success('User id copied');
    }

    return ( 
        <div className="w-full p-4 border rounded-xl space-y-3 flex flex-col bg-gray-50/80 text-[#945454]">
        <div className="flex items-center space-x-3">
          <FaUser/>
          <p>user-id</p>
        </div>

        <div className="ml-8 flex items-center justify-between">
          <p className="bg-gray-100/80 p-1 rounded-md">{userId}</p>
          <button 
          onClick={onCopy}
          className="p-3 rounded-lg bg-white border border-transparent
                           hover:border-[#945454]"><FaCopy className="text-[#945454]"/>
          </button>
        </div>
      </div>
     );
}
 
export default UserIdCopy;