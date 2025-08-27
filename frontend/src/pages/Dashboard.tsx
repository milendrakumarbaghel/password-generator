import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchHistory, generatePassword } from '../features/password/passwordSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Slider from '../components/ui/Slider'
import Switch from '../components/ui/Switch'
import IconButton from '../components/ui/IconButton'
import Spinner from '../components/ui/Spinner'
import { Card, CardContent, CardHeader } from '../components/ui/Card'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { generated, history, loading, error } = useAppSelector((s) => s.password)

  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true)
  const [description, setDescription] = useState('')
  const [visibleCount, setVisibleCount] = useState(10)

  useEffect(() => {
    dispatch(fetchHistory())
  }, [])

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const onGenerate = () => {
    if (!description.trim()) {
      toast.error('Description is required')
      return
    }
    dispatch(generatePassword({ length, includeUppercase, includeNumbers, includeSpecialChars, description: description.trim() }))
      .unwrap()
      .then(() => toast.success('Password generated'))
      .then(() => dispatch(fetchHistory()))
      .catch((e) => toast.error(String(e)))
  }

  const onCopy = async () => {
    if (!generated) return
    await navigator.clipboard.writeText(generated)
    toast.success('Copied to clipboard')
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">Generate Password</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Length: {length}</span>
              </div>
              <Slider min={6} max={64} step={1} value={length} onChange={(e) => setLength(Number(e.target.value))} />
            </div>
            <Switch label="Include Uppercase" checked={includeUppercase} onChange={(e) => setIncludeUppercase((e.target as HTMLInputElement).checked)} />
            <Switch label="Include Numbers" checked={includeNumbers} onChange={(e) => setIncludeNumbers((e.target as HTMLInputElement).checked)} />
            <Switch label="Include Special Characters" checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars((e.target as HTMLInputElement).checked)} />

            <Input label="Description" required placeholder="e.g., GitHub account" value={description} onChange={(e) => setDescription(e.target.value)} />

            <div className="flex items-center gap-2">
              <Button onClick={onGenerate} disabled={loading || !description.trim()}>{loading ? 'Generating...' : 'Generate'}</Button>
            </div>

            {loading && <div className="mt-2"><Spinner /></div>}

            {generated && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-2 flex items-center gap-2">
                <code className="px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-sm break-all">{generated}</code>
                <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={onCopy}>Copy</Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-semibold">History</h2>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading && history.length === 0 ? (
              <div className="space-y-2">
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded" />
                <div className="h-10 bg-gray-100 dark:bg-gray-800 rounded" />
              </div>
            ) : (
              <table className="w-full text-left border dark:border-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="p-2 border dark:border-gray-800">Password</th>
                    <th className="p-2 border dark:border-gray-800">Description</th>
                    <th className="p-2 border dark:border-gray-800">Created At</th>
                    <th className="p-2 border dark:border-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {history.slice(0, visibleCount).map((h) => (
                    <tr key={h.id} className="odd:bg-white even:bg-gray-50 dark:odd:bg-gray-900 dark:even:bg-gray-950">
                      <td className="p-2 border dark:border-gray-800 break-all font-mono text-sm">{h.password}</td>
                      <td className="p-2 border dark:border-gray-800">{h.description || '-'}</td>
                      <td className="p-2 border dark:border-gray-800">{new Date(h.createdAt).toLocaleString()}</td>
                      <td className="p-2 border dark:border-gray-800">
                        <IconButton onClick={async () => { await navigator.clipboard.writeText(h.password); toast.success('Copied!') }}>📋</IconButton>
                      </td>
                    </tr>
                  ))}
                  {history.length === 0 && (
                    <tr>
                      <td className="p-2 border dark:border-gray-800" colSpan={4}>No history yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            )}

            {visibleCount < history.length && (
              <div className="mt-3">
                <Button onClick={() => setVisibleCount((c) => c + 10)} className="bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700">Load more</Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
