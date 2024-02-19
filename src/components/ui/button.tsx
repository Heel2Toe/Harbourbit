
import classNames from 'classnames'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    mode: 'primary'|'secondary',
    text: string,
}

const Button: React.FC<ButtonProps> = ({
    mode,
    text,
    className,
    onClick
}) => {
     const [styles, setStyles] = useState('');

     useEffect(()=>{
      if(mode == 'primary'){
        setStyles('bg-slate-100 text-[#ba6969] hover:bg-[#ba6969] hover:text-gray-100')
       }
       else{
        setStyles('bg-slate-100 text-[#ba6969] hover:bg-[#ba6969] hover:text-gray-100')
       }
     },[])

  return (
    <motion.button 
    layout 
    onClick={onClick}
    className={classNames('p-4 border rounded-md font-extrabold outline-none', styles, className)}
    >
    {text}
    </motion.button>
  )
}

export default Button
