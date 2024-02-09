
import classNames from 'classnames'
import { motion } from 'framer-motion'
import React from 'react'

const TextBox: React.FC<React.InputHTMLAttributes<HTMLInputElement>>= ({
    name,
    type,
    onChange,
    placeholder,
    className

}) => {
  return (
   <motion.input 
   name={name}
   initial={{
    scale: 0
   }}
   animate={{
    scale: 1
   }}
   exit={{
    scale: 0
   }}
   layout
   onChange={onChange}
   className={classNames(`border outline-none p-2 text-sm rounded-md
             text-white placeholder:text-gray-200
              border-white bg-transparent w-[90%]`, className)}
   type={type} placeholder={placeholder ? placeholder : ''}/>
  )
}

export default TextBox
