import { ButtonHTMLAttributes } from 'react'

export default function Button({ className = '', ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded bg-gray-900 text-white px-4 py-2 disabled:opacity-60 hover:bg-black ${className}`}
      {...rest}
    />
  )
}
