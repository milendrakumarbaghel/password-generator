import { ButtonHTMLAttributes } from 'react'

export default function Button({ className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
  className={`inline-flex items-center justify-center rounded-md bg-indigo-600 text-white px-4 py-2 disabled:opacity-60 hover:bg-indigo-700 active:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 dark:bg-indigo-500 dark:hover:bg-indigo-600 ${className}`}
      {...rest}
    />
  )
}
