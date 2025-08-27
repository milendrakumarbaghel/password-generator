import { InputHTMLAttributes } from 'react'

type Props = Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> & { label?: string }

export default function Switch({ label, className = '', ...rest }: Props) {
  return (
    <label className={`flex items-center gap-3 cursor-pointer ${className}`}>
      <input type="checkbox" className="peer sr-only" {...rest} />
      <div className="w-10 h-6 rounded-full bg-gray-300 dark:bg-gray-700 peer-checked:bg-indigo-600 relative transition-colors">
        <span className="absolute top-0.5 left-0.5 size-5 rounded-full bg-white dark:bg-gray-100 transition-all peer-checked:translate-x-4" />
      </div>
      {label && <span className="text-sm text-gray-700 dark:text-gray-200">{label}</span>}
    </label>
  )
}
