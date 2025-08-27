import { Navigate, useLocation } from 'react-router-dom'
import { useAppSelector } from '../app/hooks'
import { ReactElement } from 'react'

export default function PrivateRoute({ children }: { children: ReactElement }) {
  const token = useAppSelector((s) => s.auth.token)
  const location = useLocation()

  if (!token && !localStorage.getItem('token')) {
    return <Navigate to="/login" replace state={{ from: location }} />
  }
  return children
}
