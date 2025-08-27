import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export default function Input({ label, error, className = '', ...rest }: Props) {
  return (
    <label className="block">
      {label && <span className="block mb-1 text-sm text-gray-700">{label}</span>}
      <input
        className={`w-full rounded border px-3 py-2 outline-none focus:ring-2 focus:ring-gray-900 ${error ? 'border-red-500' : 'border-gray-300'} ${className}`}
        {...rest}
      />
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  )
}
