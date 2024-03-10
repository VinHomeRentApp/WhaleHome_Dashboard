import { ReactNode, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { RootState } from '../redux/containers/store'

type Props = {
  children: ReactNode
}

const ProtectedRoutes = ({ children }: Props) => {
  const navigate = useNavigate()
  const { userInfo } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user === null) {
      navigate('/login')
    }
  }, [navigate, userInfo])

  return <div>{children}</div> // Render the children when the user is authenticated
}

export default ProtectedRoutes
