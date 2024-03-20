import { typoColor } from '../../../constants/mainColor'

export const layoutHeaderStyle: React.CSSProperties = {
  padding: 0,
  backgroundColor: typoColor.subMainBackground,
  display: 'flex',
  justifyContent: 'space-between'
}

export const styleIconHeader: React.CSSProperties = {
  color: typoColor.white1,
  fontSize: '16px',
  width: 64,
  height: 64
}

export const styleButtonLogout: React.CSSProperties = {
  color: typoColor.subMainBackground,
  border: '1px solid #181818',
  backgroundColor: typoColor.yellow1,
  marginTop: '1%',
  marginRight: '2%'
}

export const styleSider: React.CSSProperties = { position: 'fixed', height: '100vh', overflow: 'auto' }

export const styleLayoutContext: React.CSSProperties = {
  padding: 20,
  minHeight: '100vh',
  backgroundColor: typoColor.mainBackground
}
