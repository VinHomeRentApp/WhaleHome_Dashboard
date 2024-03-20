import { Spin } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import DashboardCard from '../Components/Dashboard/DashboardCard'
import DashboardChart from '../Components/Dashboard/DashboardChar'
import HoverField from '../Components/Dashboard/HoverField'
import ApartmentIcon from '../Components/UI/icon/ApartmentIcon'
import ContractIcon from '../Components/UI/icon/ContractIcon'
import PostIcon from '../Components/UI/icon/PostIcon'
import UserIcon from '../Components/UI/icon/UserIcon'
import {
  layoutIconApartmentStyle,
  layoutIconContractStyle,
  layoutIconPostsStyle,
  layoutIconUsersStyle,
  styleCardApartments,
  styleCardContracts,
  styleCardPosts,
  styleCardUsers
} from '../Components/UI/styles/colorCard'
import { typoColor } from '../constants/mainColor'
import { RootState, useAppDispatch } from '../redux/containers/store'
import { setUser } from '../redux/slices/auth.slice'
import { User } from '../types/user.type'
import CalendarAppointment from './Dashboard/CalendarAppointment'

const DashBoard: React.FC = () => {
  const dispatch = useAppDispatch()
  const { isLoading } = useSelector((state: RootState) => state.auth)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || 'null') as User
    dispatch(setUser(user))
  }, [])

  const styleIcon: React.CSSProperties = {
    color: typoColor.subMainBackground,
    height: 27,
    width: 27
  }

  return (
    <Spin spinning={isLoading}>
      <div>
        <div style={{ display: 'flex', gap: 10 }}>
          <DashboardCard
            colorButton='rgba(255, 160, 42, 1)'
            styleCard={styleCardPosts}
            description='Active Posts'
            icon={
              <div style={layoutIconPostsStyle}>
                <PostIcon style={styleIcon} />
              </div>
            }
            title={'Posts'}
            URL='/post/count-all'
          />

          <DashboardCard
            colorButton='rgba(45, 212, 191, 1)'
            styleCard={styleCardUsers}
            description='Active Customers'
            icon={
              <div style={layoutIconUsersStyle}>
                <UserIcon style={styleIcon} />
              </div>
            }
            title={'Customers'}
            URL='/user/count-all'
          />

          <DashboardCard
            colorButton='rgba(248, 113, 113, 1)'
            styleCard={styleCardApartments}
            description='Active Apartments'
            icon={
              <div style={layoutIconApartmentStyle}>
                <ApartmentIcon style={styleIcon} />
              </div>
            }
            title={'Apartments'}
            URL='/apartments/count-all'
          />

          <DashboardCard
            colorButton='rgba(161, 161, 170, 1)'
            styleCard={styleCardContracts}
            description='Active Contracts'
            icon={
              <div style={layoutIconContractStyle}>
                <ContractIcon style={styleIcon} />
              </div>
            }
            title={'Contracts'}
            URL='/contracts/count-all'
          />
        </div>

        <DashboardChart />
        <div>
          <div
            style={{
              backgroundColor: typoColor.subMainBackground,
              borderRadius: '14px'
            }}
          >
            <CalendarAppointment />
          </div>
          <div style={{ width: '30%' }}></div>
        </div>
      </div>
      <HoverField />
    </Spin>
  )
}

export default DashBoard
