
import classNames from 'classnames'
import { motion } from 'framer-motion'

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
  return (
    <motion.button 
    layout 
    onClick={onClick}
    className={classNames('p-4 border rounded-md font-extrabold',
     mode == 'primary' ? 'bg-slate-100 text-[#ba6969]' 
     : 'bg-[#a19fba] text-slate-100', className
    )}
    >
    {text}
    </motion.button>
  )
}

export default Button
