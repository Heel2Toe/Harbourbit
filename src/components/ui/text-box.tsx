import classNames from 'classnames'
import React from 'react'

const TextBox: React.FC<React.InputHTMLAttributes<HTMLInputElement>>= ({
    name,
    type,
    onChange,
    placeholder,
    className

}) => {
  return (
   <input 
   name={name}
   onChange={onChange}
   className={classNames(`border outline-none p-2 text-sm rounded-md bg-transparent w-[90%]`, className)}
   type={type} placeholder={placeholder ? placeholder : ''}/>
  )
}

export default TextBox
