import { Navigate, Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/Dashboard'
import UserPage from '../Pages/UserPage'
import Login from '../Pages/Login'

const ContentRoutes: React.FC = () => {
  const isLogin: boolean = localStorage.getItem('access_token') != null
  console.log(isLogin)

  return (
    <Routes>
      <>
        <Route path='/' element={<DashBoard />} />
        <Route path='/users' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
      </>
    </Routes>
  )
}
export default ContentRoutes
