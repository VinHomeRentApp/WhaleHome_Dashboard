import React from 'react'
import { Button } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'

interface ButtonActionProps {
  ID: string
  text: string
}

const ButtonAction: React.FC<ButtonActionProps> = ({ ID, text }) => {
  const handleButtonClick = (ID: string) => {
    console.log(`${text} và ${ID}`)
  }

  return <Button icon={<EllipsisOutlined />} onClick={() => handleButtonClick(ID)}></Button>
}

export default ButtonAction
