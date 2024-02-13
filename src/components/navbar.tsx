import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/use-user";
import toast from "react-hot-toast";
import NavItem from "./ui/nav-item";
import axios from "axios";
import { useSpinner } from "../hooks/use-spinner";

const Navbar = () => {
  let currentPath = window.location.pathname || "/";

  
  const [hover, setHover] = useState(currentPath);
  const {userId, logoutUser} = useUser();
  const {setSpinner} = useSpinner();
  const navigate = useNavigate();

 useEffect(()=>{  
    if(!userId){
      toast.error('Unauthenticated');
      navigate('/');
    }
 },[]);

 const logout = async () => {
  try {
    setSpinner(true)
    if (userId) {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/user/logout/${userId}`);
    }
    logoutUser();
    navigate("/");
  } catch (error: any) {
    toast.error(error.response?.data || 'Something went wrong');
    console.log('Error [dash.tsx] : \n',error);
  }
  finally{
    setSpinner(false)
  }
};

  const navItems = [
    {
      path: `/dashboard`,
      name: "Dashboard",
    },
    {
        path: `/newEntry`,
        name: "New entry",
    },
    {
      path: `/settings`,
      name: "Settings",
    },
    {
        path: `/chatroom`,
        name: "Chat room",
    },
];

  return (
    <div className="w-[95%] h-20 rounded-lg sticky top-4 border border-gray-300/90 p-2 bg-gray-50/80">
      <nav className="flex items-center justify-between gap-2 relative w-full z-[100] rounded-lg">
        <h1 className="ml-2 font-extrabold text-xl text-[#ba6969]">
          Harbourbit.
        </h1>
        <div className="flex gap-x-4 p-2">
          {navItems.map((item, index) => (
            <NavItem
              key={index}
              path={item.path}
              name={item.name}
              hover={hover}
              onMouseOver={() => setHover(item.path)}
              onMouseLeave={() => setHover(currentPath)}
              onClick={()=> navigate(item.path)}
            />     
          ))}
           
           <NavItem
              key={'logout'}
              path={'/logout'}
              name='Logout'
              hover={hover}
              onMouseOver={() => setHover('/logout')}
              onMouseLeave={() => setHover(currentPath)}
              onClick={()=> logout()}
            />   
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
