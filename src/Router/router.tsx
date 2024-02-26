import { Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/Dashboard'
import UserPage from '../Pages/UserPage'
import Login from '../Pages/Login'
import AppartmentPage from '../Pages/AppartmentPage'

const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <>
        <Route path='/' element={<DashBoard />} />
        <Route path='/users' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/appartment' element={<AppartmentPage />} />
      </>
    </Routes>
  )
}
export default ContentRoutes
