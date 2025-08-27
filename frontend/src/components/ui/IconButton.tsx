import { ButtonHTMLAttributes, PropsWithChildren } from 'react'

export default function IconButton({ className = '', children, ...rest }: PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>) {
  return (
  <button className={`rounded p-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 ${className}`} {...rest}>
      {children}
    </button>
  )
}
