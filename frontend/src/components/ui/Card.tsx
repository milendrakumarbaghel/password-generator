import { PropsWithChildren } from 'react'

export function Card({ children }: PropsWithChildren) {
  return <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-sm">{children}</div>
}
export function CardHeader({ children }: PropsWithChildren) {
  return <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50/60 dark:bg-gray-900/60 rounded-t-lg">{children}</div>
}
export function CardContent({ children }: PropsWithChildren) {
  return <div className="p-4">{children}</div>
}
