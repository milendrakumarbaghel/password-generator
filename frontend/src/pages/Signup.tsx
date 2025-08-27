import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { signup } from '../features/auth/authSlice'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})
type FormData = z.infer<typeof schema>

export default function SignupPage() {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector((s) => s.auth)
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  useEffect(() => {
    if (error) toast.error(error)
  }, [error])

  const onSubmit = (data: FormData) => {
    dispatch(signup(data)).unwrap()
      .then(() => {
        toast.success('Signup successful. Please log in.')
        navigate('/login')
      })
      .catch((e) => toast.error(String(e)))
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Create account</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" type="email" placeholder="you@example.com" {...register('email')} error={errors.email?.message} />
        <Input label="Password" type="password" {...register('password')} error={errors.password?.message} />
        <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</Button>
      </form>
      <p className="text-sm text-gray-600 mt-4">Already have an account? <Link to="/login" className="underline">Log in</Link></p>
    </div>
  )
}
