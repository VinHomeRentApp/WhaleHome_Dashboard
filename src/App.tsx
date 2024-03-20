import { ConfigProvider } from 'antd'
import { Toaster } from 'react-hot-toast'
import ContentRoutes from './Router/router.tsx'
import { typoColor } from './constants/mainColor.ts'

export default function App() {
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
