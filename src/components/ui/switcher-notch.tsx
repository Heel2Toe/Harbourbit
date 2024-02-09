import { useEffect, useState } from "react";
import NavItem from "./nav-item";
import { useSwitcher } from "../../hooks/use-switcher";

interface SwitchItemsProps {
  name: string;
  variable: "journal" | "calendar";
}

const SwitchItems: SwitchItemsProps[] = [
  {
    name: "Journal",
    variable: "journal",
  },
  {
    name: "Calendar",
    variable: "calendar",
  },
];

const SwitcherNotch = () => {
  const { mode, setMode } = useSwitcher();
  const [hoverMode, setHoverMode] = useState(mode);

  useEffect(()=>{
    setHoverMode(mode);
  },[mode])

  return (
    <div
      className="sticky top-1 right-1/2 translate-x-1/2 w-[50%] rounded-md 
                     border flex justify-between text-xs bg-gray-50/80 z-20"
    >
      {SwitchItems.map((item, index) => (
        <NavItem
          key={index}
          className="px-1 py-[3px] w-full text-xs flex justify-center"
          layoutId="switcher"
          path={item.variable}
          name={item.name}
          hover={hoverMode}
          onMouseOver={() => setHoverMode(item.variable)}
          onMouseLeave={() => setHoverMode(mode)}
          onClick={() => {
            setMode(item.variable);
          }}
        />
      ))}
    </div>
  );
};

export default SwitcherNotch;
