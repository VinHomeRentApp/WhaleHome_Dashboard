import { typoColor } from '../../../constants/mainColor'

export const styleCardPosts: React.CSSProperties = {
  width: '100%',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05)',
  color: typoColor.white1,
  background: `linear-gradient(to bottom left, rgba(255, 160, 42, 0.5), ${typoColor.subMainBackground} 40%)`,
  border: '2px solid #1e1e1e',
  borderRadius: '14px'
}

export const styleCardUsers: React.CSSProperties = {
  width: '100%',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.05)',
  color: typoColor.white1,
  background: `linear-gradient(to bottom left, rgba(45, 212, 191, 0.5), ${typoColor.subMainBackground} 40%)`,
  border: '2px solid #1e1e1e',
  borderRadius: '14px'
}
export const styleCardApartments: React.CSSProperties = {
  width: '100%',
  boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.05)',
  color: typoColor.white1,
  background: `linear-gradient(to bottom left, rgba(248, 113, 113, 0.5), ${typoColor.subMainBackground} 40%)`,
  border: '2px solid #1e1e1e',
  borderRadius: '14px'
}
export const styleCardContracts: React.CSSProperties = {
  width: '100%',
  boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.05)',
  color: typoColor.white1,
  background: `linear-gradient(to bottom left, rgba(161, 161, 170, 0.5), ${typoColor.subMainBackground} 40%)`,
  border: '2px solid #1e1e1e',
  borderRadius: '14px'
}

export const layoutIconPostsStyle: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(255, 160, 42, 1)',
  backgroundColor: 'rgba(255, 160, 42, 1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}

export const layoutIconUsersStyle: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  boxShadow: '10px 10px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(45, 212, 191, 1)',
  backgroundColor: 'rgba(45, 212, 191, 1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
export const layoutIconApartmentStyle: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(248, 113, 113, 1)',
  backgroundColor: 'rgba(248, 113, 113, 1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
export const layoutIconContractStyle: React.CSSProperties = {
  paddingTop: 10,
  paddingBottom: 10,
  width: '40px',
  height: '40px',
  borderRadius: '12px',
  boxShadow: '5px 5px 10px rgba(0, 0, 0, 0.1)',
  border: '1px solid rgba(161, 161, 170, 1)',
  backgroundColor: 'rgba(161, 161, 170, 1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
