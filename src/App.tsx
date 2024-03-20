import { Toaster } from 'react-hot-toast'
import HoverField from './Components/Dashboard/HoverField.tsx'
import ContentRoutes from './Router/router.tsx'
import { typoColor } from './constants/mainColor.ts'

export default function App() {
  return (
    <div style={{ backgroundColor: typoColor.mainBackground }}>
      <Toaster position='top-center' containerStyle={{ animation: 'ease-in-out' }} />
      <HoverField />
      <ContentRoutes />
    </div>
  )
}
