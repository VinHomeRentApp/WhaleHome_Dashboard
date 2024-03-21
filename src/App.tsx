import { ConfigProvider, notification } from 'antd'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import ContentRoutes from './Router/router.tsx'
import { typoColor } from './constants/mainColor.ts'
import useSocketConnection from './hooks/useSocketConnection.ts'

export default function App() {
  const io = useSocketConnection()

  useEffect(() => {
    if (io) {
      io.on('connect', () => {
        console.log('Socket Connected!')
      })

      io.on('payment-success-admin', (data) => {
        notification.success({
          message: `Payment successful`,
          description: `${data.name} has successfully paid for the new period`
        })
      })

      return () => {
        io.off('payment-success-admin')
      }
    }
  }, [io])
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Switch: {
              handleBg: typoColor.subMainBackground,
              colorPrimary: typoColor.yellow1,
              colorPrimaryHover: typoColor.yellow2
            },
            Table: {
              colorBgContainer: typoColor.subMainBackground,
              borderColor: typoColor.black2,
              colorText: typoColor.white1,
              colorTextHeading: typoColor.white1,
              footerBg: typoColor.white1
            },
            Pagination: {
              colorText: typoColor.white1,
              itemActiveBg: typoColor.yellow1,
              itemInputBg: typoColor.white1,
              itemLinkBg: typoColor.white1,
              colorBgTextActive: typoColor.mainBackground
            },
            Button: {
              colorTextBase: typoColor.mainBackground,
              colorBgContainer: typoColor.yellow1,
              colorText: typoColor.subMainBackground,
              borderRadius: 12,
              colorBorder: typoColor.mainBackground,
              colorPrimary: typoColor.yellow1
            },
            Calendar: {
              fullBg: typoColor.subMainBackground,
              itemActiveBg: typoColor.mainBackground,
              colorText: typoColor.white1
            },
            Input: {
              colorTextPlaceholder: typoColor.black1,
              colorBgContainer: typoColor.white1,
              colorBorder: typoColor.subMainBackground
            }
          }
        }}
      >
        <Toaster position='top-center' containerStyle={{ animation: 'ease-in-out' }} />
        <ContentRoutes />
      </ConfigProvider>
    </>
  )
}
