import { MdDelete } from "react-icons/md";
import DeleteButton from "./ui/delete-button";

interface Props{
    onClick: () => void,
    title: string
}

const SettingsActions: React.FC<Props> = ({onClick, title}) => {
    return ( 
        <div className="mt-10 flex items-center justify-between space-x-2">
        <p className="text-lg font-thin">{title}</p>
        <DeleteButton onClick={onClick}/>
      </div>
     );
}
 
export default SettingsActions;