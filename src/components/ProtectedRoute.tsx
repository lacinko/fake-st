import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAppSelector } from '../redux/hooks'

function PrivateRoutes() {
  const location = useLocation()
  const authLogin = useAppSelector((state) => state.auth.token)

  if (authLogin === undefined) {
    return null
  }

  return authLogin ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  )
}

export default PrivateRoutes
