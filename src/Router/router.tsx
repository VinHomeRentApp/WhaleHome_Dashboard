import { Route, Routes } from 'react-router-dom'
import DashBoard from '../Components/Content/Dashboard/Dashboard'
import User from '../Components/Content/User'

const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<DashBoard />} />
      <Route path='/user' element={<User />} />
    </Routes>
  )
}
export default ContentRoutes
