import React from 'react'

export const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: 'white',
  fontWeight: 'bold',
  fontSize: 20,
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096FF',
  borderRadius: 8
}

export const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 60,
  lineHeight: '60px',
  color: 'black',
  backgroundColor: 'white'
}

export const layoutStyle = {
  borderRadius: 8,
  overflow: 'hidden',
  width: 'calc(50% - 8px)',
  maxWidth: 'calc(50% - 8px)',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)' // Example box shadow
}

export const contextStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'flex-start',
  padding: '20px'
}

export const detailContextStyles: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px'
}

export const titleContextStyle: React.CSSProperties = { fontWeight: 'bold', marginRight: '10px' }
