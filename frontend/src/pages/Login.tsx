import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { login } from '../features/auth/authSlice'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const dispatch = useAppDispatch()
  const { loading, error, token } = useAppSelector((s) => s.auth)
  const navigate = useNavigate()
  const location = useLocation() as any

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  useEffect(() => {
    if (token) navigate(location.state?.from?.pathname || '/dashboard', { replace: true })
  }, [token])

  const onSubmit = (data: FormData) => {
    dispatch(login(data)).unwrap()
      .then(() => toast.success('Welcome back!'))
      .catch((e) => toast.error(String(e)))
  }

  return (
    <div className="grid md:grid-cols-2 gap-8 items-center">
      <div className="order-2 md:order-1 max-w-md mx-auto bg-white dark:bg-gray-900 p-6 rounded shadow border border-gray-200 dark:border-gray-800 w-full">
        <h1 className="text-2xl font-semibold mb-4">Log in</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
          <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
          <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Log in'}</Button>
        </form>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">No account? <Link to="/signup" className="underline">Sign up</Link></p>
      </div>
      <motion.div className="order-1 md:order-2 space-y-3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="text-3xl md:text-4xl font-bold">Strong passwords, made simple</h2>
        <p className="text-gray-600 dark:text-gray-400">Generate secure passwords and keep a history with descriptions. Your data is private and protected.</p>
        <ul className="text-gray-700 dark:text-gray-300 list-disc pl-5 space-y-1">
          <li>One-click generate and copy</li>
          <li>Remember what it’s for with descriptions</li>
          <li>Works on mobile and desktop</li>
        </ul>
      </motion.div>
    </div>
  )
}
