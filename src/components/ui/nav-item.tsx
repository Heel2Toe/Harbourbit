import classNames from "classnames";
import { motion } from "framer-motion";

interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement>{
    path?: string,
    name: string,
    hover: string,
    layoutId?: string,
    className?: string
}


const NavItem: React.FC<NavItemProps> = ({
    path, 
    name,
    hover,
    layoutId,
    className,
    onMouseOver,
    onMouseLeave,
    onClick,
}) => {
    
    return ( 
        <a
        onClick={onClick}
        key={name}
        className={classNames(
          `px-4 py-2 cursor-pointer hover:text-zinc-100 rounded-md text-sm relative no-underline duration-300 ease-in`,
          hover == path ? "text-zinc-100" : "text-zinc-600", className
        )}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        <span>{name}</span>

        {path == hover && (
          <motion.div
            className="w-full absolute bottom-0 left-0 h-full bg-[#ba6969]/80 rounded-md -z-10"
            layoutId={layoutId ? layoutId : 'navbar'}
            transition={{
              type: "spring",
              duration: 0.7,
            }}
          />
        )}
      </a>
     );
}
 
export default NavItem;