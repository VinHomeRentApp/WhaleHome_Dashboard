import { Toaster } from 'react-hot-toast'
import ContentRoutes from './Router/router.tsx'
import { ConfigProvider } from 'antd'
import { typoColor } from './constants/mainColor.ts'

export default function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Table: {
              colorBgContainer: typoColor.subMainBackground,
              borderColor: typoColor.black2,
              colorText: typoColor.white1,
              colorTextHeading: typoColor.white1
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
