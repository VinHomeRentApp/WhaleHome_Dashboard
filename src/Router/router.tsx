import { Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/Dashboard'
import User from '../Pages/User'

const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route path='/users' element={<User />} />
    </Routes>
  )
}
export default ContentRoutes
