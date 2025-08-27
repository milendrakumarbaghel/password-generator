import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { fetchHistory, generatePassword } from '../features/password/passwordSlice'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import toast from 'react-hot-toast'

export default function Dashboard() {
  const dispatch = useAppDispatch()
  const { generated, history, loading, error } = useAppSelector((s) => s.password)

  const [length, setLength] = useState(12)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSpecialChars, setIncludeSpecialChars] = useState(true)
  const [description, setDescription] = useState('')

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
      <section className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Generate Password</h2>
        <div className="space-y-4">
          <Input label="Length" type="number" min={6} max={64} value={length} onChange={(e) => setLength(Number(e.target.value))} />

          <Input label="Description" required placeholder="e.g., GitHub account" value={description} onChange={(e) => setDescription(e.target.value)} />

          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)} />
            <span>Include Uppercase</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)} />
            <span>Include Numbers</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={includeSpecialChars} onChange={(e) => setIncludeSpecialChars(e.target.checked)} />
            <span>Include Special Characters</span>
          </label>

          <div className="flex items-center gap-2">
            <Button onClick={onGenerate} disabled={loading || !description.trim()}>{loading ? 'Generating...' : 'Generate'}</Button>
            {generated && (
              <>
                <code className="px-3 py-2 bg-gray-100 rounded border text-sm break-all">{generated}</code>
                <Button type="button" className="bg-blue-600 hover:bg-blue-700" onClick={onCopy}>Copy</Button>
              </>
            )}
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded shadow overflow-auto">
        <h2 className="text-xl font-semibold mb-4">History</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-2 border">Password</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Created At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h) => (
                <tr key={h.id} className="odd:bg-white even:bg-gray-50">
                  <td className="p-2 border break-all font-mono text-sm">{h.password}</td>
                  <td className="p-2 border">{h.description || '-'}</td>
                  <td className="p-2 border">{new Date(h.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {history.length === 0 && (
                <tr>
                  <td className="p-2 border" colSpan={3}>No history yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
