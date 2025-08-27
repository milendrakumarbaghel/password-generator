import { InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & { label?: string }

export default function Slider({ label, className = '', ...rest }: Props) {
  return (
    <label className="block">
  {label && <span className="block mb-2 text-sm text-gray-700 dark:text-gray-200">{label}</span>}
  <input type="range" className={`w-full accent-indigo-600 ${className}`} {...rest} />
    </label>
  )
}
