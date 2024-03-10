import { Toaster } from 'react-hot-toast'
import ContentRoutes from './Router/router.tsx'

export default function App() {
  return (
    <>
      <Toaster position='top-center' containerStyle={{ animation: 'ease-in-out' }} />
      <ContentRoutes />
    </>
  )
}
