import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...rest }: Props) {
  return (
    <label className="block">
      {label && <span className="block mb-1 text-sm text-gray-700 dark:text-gray-200">{label}</span>}
      <input
        className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-2 focus:ring-indigo-500/50 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ${error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  )
}
