import { Route, Routes } from 'react-router-dom'
import DashBoard from '../Pages/Dashboard'
import UserPage from '../Pages/UserPage'
import AppartmentPage from '../Pages/AppartmentPage'
import LayoutAdmin from '../Pages/Layout'
import Login from '../Pages/Login'
import Appointment from '../Pages/AppointmentPage'
import ContractPage from '../Pages/ContractPage'
import ProblemPage from '../Pages/ProblemsPage'
import PostPage from '../Pages/PostPage'
import ReviewPage from '../Pages/ReviewPage'
import IssuePage from '../Pages/IssuePage'

const ContentRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <LayoutAdmin>
            <DashBoard />
          </LayoutAdmin>
        }
      />
      <Route
        path='/users'
        element={
          <LayoutAdmin>
            <UserPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/appartments'
        element={
          <LayoutAdmin>
            <AppartmentPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/appointments'
        element={
          <LayoutAdmin>
            <Appointment />
          </LayoutAdmin>
        }
      />
      <Route
        path='/posts'
        element={
          <LayoutAdmin>
            <PostPage />
          </LayoutAdmin>
        }
      />

      <Route
        path='/contracts'
        element={
          <LayoutAdmin>
            <ContractPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/problem'
        element={
          <LayoutAdmin>
            <ProblemPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/review'
        element={
          <LayoutAdmin>
            <ReviewPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/issue'
        element={
          <LayoutAdmin>
            <IssuePage />
          </LayoutAdmin>
        }
      />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
export default ContentRoutes
