import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router'

type Props = {
  children: ReactNode
}

const ProtectedRoutes = ({ children }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null')
    if (user === null) {
      navigate('/login')
    }
  }, [navigate])

  return <div>{children}</div> // Render the children when the user is authenticated
}

export default ProtectedRoutes
