import { MdDelete } from "react-icons/md";

const DeleteButton = ({onClick}:{onClick: ()=> void}) => {
    return ( 
        <button
        onClick={onClick}
        className="p-2 border flex justify-center items-center h-10 w-10 rounded-lg hover:bg-red-400 duration-300"
      >
        <MdDelete className="text-xl" />
      </button>
     );
}
 
export default DeleteButton;