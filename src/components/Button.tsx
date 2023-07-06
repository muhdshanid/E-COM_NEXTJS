"use client"

import { ComponentProps } from "react"
import {experimental_useFormStatus as useFormStatus} from 'react-dom'
type ButtonProps  = {
    children: React.ReactNode
    className?: string
} & ComponentProps<"button">
const Button = ({children, className, ...props}: ButtonProps) => {
    const {pending} = useFormStatus()
  return (
    <button {...props} disabled={pending} type="submit" className={`btn btn-primary ${className}`}>
        {pending && (
            <span className="loading loading-spinner"></span>
        )}
        {children}
    </button>
  )
}

export default Button