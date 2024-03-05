import { Route, Routes } from 'react-router-dom'
import AppartmentPage from '../Pages/AppartmentPage'
import Appointment from '../Pages/AppointmentPage'
import ContractPage from '../Pages/ContractPage'
import DashBoard from '../Pages/Dashboard'
import IssuePage from '../Pages/IssuePage'
import LayoutAdmin from '../Pages/Layout'
import Login from '../Pages/Login'
import PostPage from '../Pages/PostPage'
import ProblemPage from '../Pages/ProblemsPage'
import ReviewPage from '../Pages/ReviewPage'
import UserPage from '../Pages/UserPage'
import ZonePage from '../Pages/ZonePage'
import BuildingPage from '../Pages/BuildingPage'
import AreaPage from '../Pages/AreaPage'

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
      ,
      <Route
        path='/zones'
        element={
          <LayoutAdmin>
            <ZonePage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/buildings'
        element={
          <LayoutAdmin>
            <BuildingPage />
          </LayoutAdmin>
        }
      />
      <Route
        path='/areas'
        element={
          <LayoutAdmin>
            <AreaPage />
          </LayoutAdmin>
        }
      />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}
export default ContentRoutes
